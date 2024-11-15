import dbConnect from "../../../dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import authenticate from "../middleware/auth";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "PUT") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  authenticate(req, res, async () => {
    const userId = req.user.id;

    try {
      const { name, email, password } = req.body;

      if (!name || !email) {
        return res.status(400).json({ success: false, message: "Name and email are required" });
      }

      const updatedData = { name, email };

      if (password) {
        const salt = await bcrypt.genSalt(10);
        updatedData.password = await bcrypt.hash(password, salt);
      }

      const user = await User.findByIdAndUpdate(userId, updatedData, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
}

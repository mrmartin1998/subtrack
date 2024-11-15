import dbConnect from "../../../dbConnect";
import User from "../../../models/User";
import authenticate from "../middleware/auth";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  authenticate(req, res, async () => {
    const userId = req.user.id;

    try {
      const user = await User.findById(userId).select("-password"); // Exclude password
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, name: user.name, email: user.email });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
}

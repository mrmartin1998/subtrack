import dbConnect from "../../../dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Validate password
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token (include user's ID and name)
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, token });
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

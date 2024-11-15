import dbConnect from "../../../dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, data: { id: user._id, name: user.name, email: user.email } });
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

import jwt from "jsonwebtoken";
import dbConnect from "../../../dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ success: false, message: "Missing refresh token" });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const newToken = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ success: true, token: newToken });
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid refresh token" });
  }
}

import dbConnect from "../../../dbConnect";
import Subscription from "../../../models/Subscription";
import authenticate from "../middleware/auth";

export default async function handler(req, res) {
  await dbConnect();

  authenticate(req, res, async () => {
    const userId = req.user.id;

    if (req.method === "GET") {
      try {
        const subscriptions = await Subscription.find({ userId });
        res.status(200).json({ success: true, data: subscriptions });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    } else if (req.method === "POST") {
      try {
        const subscription = await Subscription.create({ ...req.body, userId });
        res.status(201).json({ success: true, data: subscription });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    } else {
      res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
  });
}

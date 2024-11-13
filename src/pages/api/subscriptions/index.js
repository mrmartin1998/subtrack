import dbConnect from "../../../dbConnect";
import Subscription from "../../../models/Subscription";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const subscriptions = await Subscription.find({});
      res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const subscription = await Subscription.create(req.body);
      res.status(201).json({ success: true, data: subscription });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

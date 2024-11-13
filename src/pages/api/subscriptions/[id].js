import dbConnect from "../../../dbConnect";
import Subscription from "../../../models/Subscription";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const subscription = await Subscription.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!subscription) {
        return res.status(404).json({ success: false, message: "Subscription not found" });
      }
      res.status(200).json({ success: true, data: subscription });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedSubscription = await Subscription.deleteOne({ _id: id });
      if (!deletedSubscription.deletedCount) {
        return res.status(404).json({ success: false, message: "Subscription not found" });
      }
      res.status(200).json({ success: true, message: "Subscription deleted successfully" });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

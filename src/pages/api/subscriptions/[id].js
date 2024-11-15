import dbConnect from "../../../dbConnect";
import Subscription from "../../../models/Subscription";
import authenticate from "../middleware/auth";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  authenticate(req, res, async () => {
    const userId = req.user.id;

    if (req.method === "PUT") {
      try {
        const subscription = await Subscription.findOneAndUpdate(
          { _id: id, userId }, // Ensure the subscription belongs to the authenticated user
          req.body,
          { new: true, runValidators: true }
        );

        if (!subscription) {
          return res.status(404).json({
            success: false,
            message: "Subscription not found or not authorized",
          });
        }

        res.status(200).json({ success: true, data: subscription });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    } else if (req.method === "DELETE") {
      try {
        const deletedSubscription = await Subscription.findOneAndDelete({
          _id: id,
          userId,
        });

        if (!deletedSubscription) {
          return res.status(404).json({
            success: false,
            message: "Subscription not found or not authorized",
          });
        }

        res.status(200).json({
          success: true,
          message: "Subscription deleted successfully",
        });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    } else {
      res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
  });
}

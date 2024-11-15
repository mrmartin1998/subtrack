import dbConnect from "../../../dbConnect";
import Subscription from "../../../models/Subscription";
import authenticate from "../middleware/auth";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  authenticate(req, res, async () => {
    const userId = req.user.id; // Extract user ID from the token

    try {
      if (req.method === "GET") {
        // Fetch subscription by ID
        const subscription = await Subscription.findOne({ _id: id, userId });
        if (!subscription) {
          return res.status(404).json({
            success: false,
            message: "Subscription not found or you are not authorized to view it.",
          });
        }

        return res.status(200).json({ success: true, data: subscription });
      } else if (req.method === "PUT") {
        // Update subscription
        const subscription = await Subscription.findOneAndUpdate(
          { _id: id, userId }, // Ensure the subscription belongs to the authenticated user
          req.body,
          { new: true, runValidators: true } // Return the updated document
        );

        if (!subscription) {
          return res.status(404).json({
            success: false,
            message: "Subscription not found or you are not authorized to update it.",
          });
        }

        return res.status(200).json({ success: true, data: subscription });
      } else if (req.method === "DELETE") {
        // Delete subscription
        const deletedSubscription = await Subscription.findOneAndDelete({
          _id: id,
          userId,
        });

        if (!deletedSubscription) {
          return res.status(404).json({
            success: false,
            message: "Subscription not found or you are not authorized to delete it.",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Subscription deleted successfully",
        });
      } else {
        // Handle unsupported methods
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
      }
    } catch (error) {
      console.error("Error in subscription handler:", error.message);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
}

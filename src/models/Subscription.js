import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Subscription || mongoose.model("Subscription", SubscriptionSchema);

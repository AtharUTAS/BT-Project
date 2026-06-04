import mongoose from "mongoose";

const FeedbackSchema = mongoose.Schema({
  message: { type: String, required: true },
  email: { type: String }, 
  createdAt: { type: Date, default: Date.now }
});

const FeedbackModel = mongoose.model("Feedbacks", FeedbackSchema);

export default FeedbackModel;
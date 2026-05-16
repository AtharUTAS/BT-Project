import mongoose from "mongoose";

const FeedbackSchema = mongoose.Schema({
  message: { type: String, required: true },
  email: { type: String }, // اختياري (لو المستخدم مسجل دخول)
  createdAt: { type: Date, default: Date.now }
});

const FeedbackModel = mongoose.model("Feedbacks", FeedbackSchema);

export default FeedbackModel;
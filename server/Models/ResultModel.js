import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({

  name: String,
  email: String,
  bestField: String,

  percentages: {
    software: Number,
    networking: Number,
    cybersecurity: Number,
    ai: Number,
    database: Number
  }

}, { timestamps: true });

export default mongoose.model("Result", ResultSchema);
import mongoose from "mongoose";

const LearnProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  streakCount: { type: Number, default: 0 },
  lastCompletedDate: { type: String, default: null }, // "YYYY-MM-DD"
  completedDates: { type: [String], default: [] },    // "YYYY-MM-DD" entries
});

const LearnProgress = mongoose.model("LearnProgress", LearnProgressSchema);

export default LearnProgress;

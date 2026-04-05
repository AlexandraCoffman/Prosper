import mongoose from "mongoose";

const SavingsGoalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    accountName: { type: String, required: true },
    monthlyDeposit: { type: Number, required: true },
    amountSaved: { type: Number, required: true },
    amountRemaining: { type: Number, required: true },
    projectedCompletionDate: { type: String, required: true },
  },
  { _id: false },
);

const SavingsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    goals: { type: [SavingsGoalSchema], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model("Savings", SavingsSchema);

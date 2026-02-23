import mongoose from "mongoose";

const SavingsSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  account_id: {
    type: Number,
    required: true,
    unique: true,
  },
  goal_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Savings = mongoose.model("Savings", SavingsSchema);

export default Savings;

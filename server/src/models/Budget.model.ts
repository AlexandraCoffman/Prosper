import mongoose from "mongoose";

interface Budget {
  want: Number;
  need: Number;
  save: Number;
}

const BudgetSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  income: {
    type: String,
    required: true,
  },
  expense: {
    type: Date,
    required: true,
  },
  budget: {
    type: Array<Budget>,
    required: true,
    default: [],
  },
});

const Budget = mongoose.model("Budget", BudgetSchema);

export default Budget;

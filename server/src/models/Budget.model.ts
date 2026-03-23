import mongoose from "mongoose";
interface IBudget {
  want: number;
  need: number;
  save: number;
}

const BudgetSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  income: {
    type: Number,
    required: true,
  },
  expense: {
    type: Number,
    required: true,
  },
  budget: {
    type: [{
      want: Number,
      need: Number,
      save: Number,
    }],
    required: true,
    default: [],
  },
});

const Budget = mongoose.model("Budget", BudgetSchema);
export default Budget;

import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  month: { type: String, required: true },
  
  totalIncome: { type: Number, required: true },
  totalBills: { type: Number, required: true },
  
  splitStrategy: {
    needs: { type: Number, required: true },
    wants: { type: Number, required: true },
    savings: { type: Number, required: true }
  },

  needsItems: [
    {
      title: String,
      subtitle: String,
      amount: String
    }
  ]
}, { timestamps: true });

export default mongoose.model('Budget', BudgetSchema);
import Budget from "../models/Budget.model";
import Transaction from "../models/Transaction.model";
import LearnProgress from "../models/Learn.model";

function generateTxnId(): string {
  return `txn_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export async function seedUserData(userId: string): Promise<void> {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const currentMonth = `${MONTH_NAMES[month]} ${year}`;

  await Budget.findOneAndUpdate(
    { userId },
    {
      month: currentMonth,
      totalIncome: 3200,
      totalBills: 1400,
      splitStrategy: { needs: 0.50, wants: 0.30, savings: 0.20 },
      needsItems: [
        { title: "Rent", subtitle: "30% of paycheck", amount: "$950" },
        { title: "Groceries", subtitle: "10% of paycheck", amount: "$320" },
        { title: "Utilities", subtitle: "5% of paycheck", amount: "$160" },
      ],
    },
    { upsert: true, new: true },
  );

  const sampleTransactions = [
    { name: "Part-time Paycheck", date: new Date(year, month, 1), amount: 1600, type: "Credit", category: "Need" },
    { name: "Rent", date: new Date(year, month, 1), amount: 950, type: "Debit", category: "Need" },
    { name: "Spotify", date: new Date(year, month, 1), amount: 11.99, type: "Debit", category: "Want" },
    { name: "Netflix", date: new Date(year, month, 1), amount: 15.99, type: "Debit", category: "Want" },
    { name: "Trader Joe's", date: new Date(year, month, 2), amount: 67.34, type: "Debit", category: "Need" },
    { name: "Electric Bill", date: new Date(year, month, 3), amount: 85.00, type: "Debit", category: "Need" },
    { name: "Uber Eats", date: new Date(year, month, 3), amount: 24.50, type: "Debit", category: "Want" },
    { name: "Amazon", date: new Date(year, month, 4), amount: 29.99, type: "Debit", category: "Want" },
    { name: "Savings Transfer", date: new Date(year, month, 5), amount: 200, type: "Savings", category: "Saving" },
  ];

  await Transaction.insertMany(
    sampleTransactions.map((t) => ({
      userid: userId,
      id: generateTxnId(),
      ...t,
    })),
  );

    const today = new Date();
  const toDateString = (d: Date) => d.toISOString().slice(0, 10);
  const seedDates = [1, 2, 3].map((offset) => {
    const d = new Date(today);
    d.setDate(today.getDate() - offset);
    return toDateString(d);
  });

  await LearnProgress.findOneAndUpdate(
    { userId },
    { streakCount: 3, lastCompletedDate: seedDates[0], completedDates: seedDates },
    { upsert: true, new: true },
  );
}

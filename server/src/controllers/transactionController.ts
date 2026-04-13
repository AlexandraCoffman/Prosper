import Transaction from "../models/Transaction.model";
import { Request, Response } from "express";
import { getAuth } from "@clerk/express";

function generateTxnId(): string {
  return `txn_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export const getMyTransactions = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const transactions = await Transaction.find({ userid: userId }).sort({
      date: -1,
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { userid } = req.params;
    const transactions = await Transaction.find({ userid });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const addTransaction = async (req: Request, res: Response) => {
  try {
    const { 
      name, 
      date,
      amount, 
      type, 
      category, 
    } = req.body;
    const { userId } = getAuth(req);
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }
    const transaction = new Transaction({userid: userId, id: generateTxnId(), name, date, amount,type, category});
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const request = req.body;
    await Transaction.findByIdAndDelete(userId, request).select(
      "name date amount",
    );
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const filterTransaction = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const transactions = await Transaction.find({ userid: userId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const topCharges = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const transactions = await Transaction.find({ userid: userId }).sort({
      date: -1,
    });
    //.limit(3);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error });
  }
//   try {
//     const { userId } = getAuth(req);
//     const transactions = await Transaction.find({ userid: userId }).sort({
//       date: -1,
//     });
//     res.status(200).json(transactions);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
};

export const repeatingCharges = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const transactions = await Transaction.aggregate([
        { $match: { userid: userId } },
        { $group: { _id : '$name', count: { $sum: 1 },  totalCost: {$sum: "$amount" }}},
        { $sort: { count: -1 } } 
    ]).limit(3);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error });
  }
};

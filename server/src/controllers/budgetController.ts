import { Request, Response } from 'express';
import { getAuth } from '@clerk/express';
import Budget from '../models/Budget.model';
export const getBudget = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const budget = await Budget.findOne({ userId });
    if (!budget) {
      return res.status(404).json({ message: "No budget found" }); 
    }
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ error: "Server error fetching budget" });
  }
};

export const getMyBudget = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const budget = await Budget.findOne({ userId });
    if (!budget) {
      return res.status(404).json({ message: "No budget found" });
    }
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ error: "Server error fetching budget" });
  }
};

export const upsertBudget = async (req: Request, res: Response) => {
  try {
    const { 
      userId, 
      month, 
      needsItems, 
      totalIncome, 
      totalBills, 
      splitStrategy 
    } = req.body;
    
    const budget = await Budget.findOneAndUpdate(
      { userId },
      { month, needsItems, totalIncome, totalBills, splitStrategy },
      { new: true, upsert: true }
    );
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ error: "Server error saving budget" });
  }
};
import { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import Savings from "../models/Savings.model";

export const getSavingsGoals = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const doc = await Savings.findOne({ userId });
    if (!doc) {
      res.status(200).json({ goals: [] });
      return;
    }
    res.status(200).json({ goals: doc.goals });
  } catch (error) {
    res.status(500).json({ error: "Server error fetching savings goals" });
  }
};

export const upsertSavingsGoals = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const { goals } = req.body;

    if (!Array.isArray(goals)) {
      res.status(400).json({ error: "goals must be an array" });
      return;
    }

    const doc = await Savings.findOneAndUpdate(
      { userId },
      { goals },
      { new: true, upsert: true },
    );
    res.status(200).json({ goals: doc.goals });
  } catch (error) {
    res.status(500).json({ error: "Server error saving savings goals" });
  }
};

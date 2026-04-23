import { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import User from "../models/User.model";
import { seedUserData } from "../utils/seedUserData";

export const getMe = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const user = await User.findOne({ id: userId });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      life_info: user.life_info,
      support: user.support,
      goals: user.goals,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const { first_name, last_name, email, life_info, support, goals } = req.body;

    const existing = await User.findOne({ id: userId });
    if (existing) {
      res.status(409).json({ error: "User already exists" });
      return;
    }

    const user = new User({
      id: userId,
      first_name,
      last_name,
      email,
      life_info: life_info ?? [],
      support: support ?? [],
      goals: goals ?? [],
    });

    await user.save();

    try {
      await seedUserData(userId as string);
    } catch (seedErr) {
      console.error("Failed to seed sample data for new user:", seedErr);
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

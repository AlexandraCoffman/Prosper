import { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import User from "../models/User.model";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const { first_name, last_name, email, goals } = req.body;

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
      goals: goals ?? [],
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

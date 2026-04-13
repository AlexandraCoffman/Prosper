import { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import LearnProgress from "../models/Learn.model";

const LESSONS = [
  { icon: "wallet-outline",       title: "Budgeting 101",               duration: "5 min" },
  { icon: "trending-up-outline",  title: "Building an Emergency Fund",  duration: "7 min" },
  { icon: "card-outline",         title: "Understanding Credit Scores", duration: "6 min" },
  { icon: "pie-chart-outline",    title: "The 50/30/20 Rule",           duration: "4 min" },
];

const VIDEOS = [
  { title: "How to Stop Living Paycheck to Paycheck" },
  { title: "Investing for Beginners" },
  { title: "How to Pay Off Debt Fast" },
];

function toDateString(date: Date): string {
  return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function buildWeekDays(completedDates: string[]): { label: string; completed: boolean }[] {
  const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const today = new Date();
  const days: { label: string; completed: boolean }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push({
      label: DAY_LABELS[d.getDay()],
      completed: completedDates.includes(toDateString(d)),
    });
  }
  return days;
}

export const completeLesson = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const today = toDateString(new Date());
    const yesterday = toDateString(new Date(Date.now() - 86_400_000));

    const progress = await LearnProgress.findOne({ userId });

    if (!progress) {
      await LearnProgress.create({
        userId,
        streakCount: 1,
        lastCompletedDate: today,
        completedDates: [today],
      });
      res.status(200).json({ streakCount: 1 });
      return;
    }

    if (progress.completedDates.includes(today)) {
      res.status(200).json({ streakCount: progress.streakCount });
      return;
    }

    const newStreakCount = progress.completedDates.includes(yesterday)
      ? progress.streakCount + 1
      : 1;

    await LearnProgress.updateOne(
      { userId },
      {
        $addToSet: { completedDates: today },
        $set: { streakCount: newStreakCount, lastCompletedDate: today },
      },
    );

    res.status(200).json({ streakCount: newStreakCount });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getLearnData = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const progress = await LearnProgress.findOneAndUpdate(
      { userId },
      { $setOnInsert: { userId, streakCount: 0, completedDates: [], lastCompletedDate: null } },
      { upsert: true, new: true },
    );

    res.json({
      userName: "",
      streak: {
        count: progress.streakCount,
        days: buildWeekDays(progress.completedDates),
      },
      recommendation: LESSONS[0],
      lessons: LESSONS,
      videos: VIDEOS,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

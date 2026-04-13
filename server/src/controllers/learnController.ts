import { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import User from "../models/User.model";
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

// Maps goal keywords to the most relevant lesson index
const GOAL_LESSON_MAP: Record<string, number> = {
  budget:  0,
  saving:  1,
  credit:  2,
  invest:  1,
  debt:    1,
};

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

function pickRecommendation(goals: string[]): (typeof LESSONS)[number] {
  for (const goal of goals) {
    const lower = goal.toLowerCase();
    for (const [keyword, idx] of Object.entries(GOAL_LESSON_MAP)) {
      if (lower.includes(keyword)) return LESSONS[idx];
    }
  }
  return LESSONS[0];
}

export const getLearnData = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    const user = await User.findOne({ id: userId });

    let progress = await LearnProgress.findOne({ userId });
    if (!progress) {
      progress = await LearnProgress.create({ userId });
    }

    res.json({
      userName: user.first_name,
      streak: {
        count: progress.streakCount,
        days: buildWeekDays(progress.completedDates),
      },
      recommendation: pickRecommendation(user.goals),
      lessons: LESSONS,
      videos: VIDEOS,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

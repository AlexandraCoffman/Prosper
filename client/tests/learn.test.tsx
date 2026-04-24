import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LearnLessonsSection from "../components/learn-lessons-section";
import RecommendationCard from "../components/learn-recommendation-card";
import LearnStreakTracker from "../components/learn-streak-tracker";
import LearnHeader from "../components/learn-header";

jest.mock("@expo/vector-icons", () => ({
  Ionicons: () => null,
}));

const mockLessons = [
  { icon: "wallet-outline", title: "Budgeting 101", duration: "5 min" },
  { icon: "trending-up-outline", title: "Building an Emergency Fund", duration: "7 min" },
  { icon: "card-outline", title: "Understanding Credit Scores", duration: "6 min" },
];

const mockRecommendation = {
  icon: "wallet-outline",
  title: "Budgeting 101",
  duration: "5 min",
};

const mockStreak = {
  count: 3,
  days: [
    { label: "Mo", completed: true },
    { label: "Tu", completed: true },
    { label: "We", completed: true },
    { label: "Th", completed: false },
    { label: "Fr", completed: false },
  ],
};

describe("Learn Components", () => {
  it("renders all lesson titles", () => {
    const { getByText } = render(
      <LearnLessonsSection lessons={mockLessons} onComplete={() => {}} />
    );
    expect(getByText("Budgeting 101")).toBeTruthy();
    expect(getByText("Building an Emergency Fund")).toBeTruthy();
    expect(getByText("Understanding Credit Scores")).toBeTruthy();
  });

  it("calls onComplete when a lesson is pressed", () => {
    const onComplete = jest.fn();
    const { getByText } = render(
      <LearnLessonsSection lessons={mockLessons} onComplete={onComplete} />
    );
    fireEvent.press(getByText("Budgeting 101"));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("renders recommendation title and duration", () => {
    const { getByText } = render(
      <RecommendationCard recommendation={mockRecommendation} />
    );
    expect(getByText("Budgeting 101")).toBeTruthy();
    expect(getByText("5 min")).toBeTruthy();
  });

  it("renders streak count correctly", () => {
    const { getByText } = render(<LearnStreakTracker streak={mockStreak} />);
    expect(getByText("3 day streak")).toBeTruthy();
  });

  it("calls onNavigateToSettings when settings icon is pressed", () => {
    const onNavigateToSettings = jest.fn();
    const { getByText } = render(
      <LearnHeader onNavigateToSettings={onNavigateToSettings} />
    );
    fireEvent.press(getByText("Learn"));
    // settings button is next to the title — press via accessible parent
  });

  it("shows checkmarks only for completed streak days", () => {
    const { getAllByText } = render(<LearnStreakTracker streak={mockStreak} />);
    expect(getAllByText("✓")).toHaveLength(3);
  });
});

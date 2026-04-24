import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Dashboard from "../app/tabs/dashboard/dashboard";
import SavingsGoals from "../app/tabs/dashboard/savings-goals";
import { useAuth } from "@clerk/clerk-expo";

jest.mock("@clerk/clerk-expo", () => ({
  useAuth: jest.fn(),
}));

describe("Dashboard", () => {
  const sampleGoal = {
    title: "Test Goal",
    accountName: "Chase",
    monthlyDeposit: 100,
    amountSaved: 200,
    amountRemaining: 800,
    projectedCompletionDate: "01/01/2027",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ isSignedIn: false });
  });

  it("greets with first name when provided", () => {
    const { getByText } = render(
      <Dashboard savingsGoals={[]} firstName="Alex" />,
    );
    expect(getByText("Hello Alex!")).toBeTruthy();
  });

  it("uses a generic greeting when firstName is missing", () => {
    const { getByText } = render(<Dashboard savingsGoals={[]} />);
    expect(getByText("Hello there!")).toBeTruthy();
  });

  it("lists savings goals from props", () => {
    const { getByText } = render(
      <Dashboard savingsGoals={[sampleGoal]} firstName="Alex" />,
    );
    expect(getByText("Test Goal")).toBeTruthy();
    expect(getByText("$200")).toBeTruthy();
  });

  it("invokes onNavigateToSavingsGoals when a goal card is pressed", () => {
    const onNavigate = jest.fn();
    const { getByText } = render(
      <Dashboard
        savingsGoals={[sampleGoal]}
        onNavigateToSavingsGoals={onNavigate}
      />,
    );
    fireEvent.press(getByText("Test Goal"));
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });

  it("when signed out and no account data, uses mock spending totals", () => {
    (useAuth as jest.Mock).mockReturnValue({ isSignedIn: false });
    const { getByText } = render(<Dashboard savingsGoals={[]} />);
    const mockTotal = 85 + 210 + 145 + 310 + 275;
    expect(getByText(`$${mockTotal}`)).toBeTruthy();
  });

  it("when signed in without spendingFromAccount, shows zero spending series", () => {
    (useAuth as jest.Mock).mockReturnValue({ isSignedIn: true });
    const { getByText } = render(<Dashboard savingsGoals={[]} />);
    expect(getByText("$0")).toBeTruthy();
  });

  it("uses spendingFromAccount when valid data is provided", () => {
    (useAuth as jest.Mock).mockReturnValue({ isSignedIn: true });
    const data = [
      { day: 1, amount: 10 },
      { day: 15, amount: 30 },
    ];
    const { getByText } = render(
      <Dashboard
        savingsGoals={[]}
        spendingFromAccount={{ totalSpending: 40, data }}
      />,
    );
    expect(getByText("$40")).toBeTruthy();
  });

  it("shows validation when goal name is missing", async () => {
    const onAddGoal = jest.fn();
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <Dashboard savingsGoals={[]} onAddGoal={onAddGoal} />,
    );
    fireEvent.press(getByTestId("dashboard-add-goal-button"));
    fireEvent.changeText(getByPlaceholderText("Monthly deposit ($)"), "50");
    fireEvent.changeText(getByPlaceholderText("Total goal amount ($)"), "500");
    fireEvent.press(getByText("Add"));

    await waitFor(() => {
      expect(getByText("Goal name is required.")).toBeTruthy();
    });
    expect(onAddGoal).not.toHaveBeenCalled();
  });

  it("submits a valid goal and calls onAddGoal", async () => {
    const onAddGoal = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ isSignedIn: true });
    const { getByTestId, getByText, getByPlaceholderText, queryByText } =
      render(<Dashboard savingsGoals={[]} onAddGoal={onAddGoal} />);

    fireEvent.press(getByTestId("dashboard-add-goal-button"));
    fireEvent.changeText(getByPlaceholderText("Goal name"), "Rainy day");
    fireEvent.changeText(getByPlaceholderText("Monthly deposit ($)"), "100");
    fireEvent.changeText(getByPlaceholderText("Total goal amount ($)"), "500");
    fireEvent.changeText(
      getByPlaceholderText("Amount already saved ($ optional)"),
      "100",
    );
    fireEvent.press(getByText("Save"));

    await waitFor(() => {
      expect(onAddGoal).toHaveBeenCalledTimes(1);
    });
    const arg = onAddGoal.mock.calls[0][0];
    expect(arg.title).toBe("Rainy day");
    expect(arg.monthlyDeposit).toBe(100);
    expect(arg.amountSaved).toBe(100);
    expect(arg.amountRemaining).toBe(400);
    expect(arg.projectedCompletionDate).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    expect(queryByText("Goal name is required.")).toBeNull();
  });

  it("rejects amount saved greater than goal amount", async () => {
    const onAddGoal = jest.fn();
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <Dashboard savingsGoals={[]} onAddGoal={onAddGoal} />,
    );
    fireEvent.press(getByTestId("dashboard-add-goal-button"));
    fireEvent.changeText(getByPlaceholderText("Goal name"), "X");
    fireEvent.changeText(getByPlaceholderText("Monthly deposit ($)"), "10");
    fireEvent.changeText(getByPlaceholderText("Total goal amount ($)"), "100");
    fireEvent.changeText(
      getByPlaceholderText("Amount already saved ($ optional)"),
      "150",
    );
    fireEvent.press(getByText("Add"));

    await waitFor(() => {
      expect(
        getByText("Amount saved cannot exceed the goal amount."),
      ).toBeTruthy();
    });
    expect(onAddGoal).not.toHaveBeenCalled();
  });
});

describe("SavingsGoals", () => {
  const goals = [
    {
      title: "Emergency",
      accountName: "Ally",
      monthlyDeposit: 50,
      amountSaved: 100,
      amountRemaining: 400,
      projectedCompletionDate: "06/01/2026",
    },
  ];

  it("renders title and personalized description", () => {
    const { getByText } = render(
      <SavingsGoals savingsGoals={goals} firstName="Jordan" />,
    );
    expect(getByText("Savings Goals")).toBeTruthy();
    expect(
      getByText(/Great job, Jordan! You're getting one step closer/i),
    ).toBeTruthy();
  });

  it("falls back to Friend in copy when firstName is omitted", () => {
    const { getByText } = render(<SavingsGoals savingsGoals={goals} />);
    expect(getByText(/Great job, Friend!/i)).toBeTruthy();
  });

  it("shows goal details inside meter cards", () => {
    const { getByText, getAllByText } = render(
      <SavingsGoals savingsGoals={goals} />,
    );
    expect(getAllByText("Emergency").length).toBeGreaterThanOrEqual(1);
    expect(getByText("Ally")).toBeTruthy();
    expect(getByText("$50")).toBeTruthy();
    expect(getByText("$100")).toBeTruthy();
    expect(getByText("$400")).toBeTruthy();
    expect(getByText("06/01/2026")).toBeTruthy();
  });

  it("calls onBack when the back control is pressed", () => {
    const onBack = jest.fn();
    const { getByTestId } = render(
      <SavingsGoals savingsGoals={goals} onBack={onBack} />,
    );
    fireEvent.press(getByTestId("savings-goals-back"));
    expect(onBack).toHaveBeenCalled();
  });

  it("calls onNavigateToSettings when settings is pressed", () => {
    const onSettings = jest.fn();
    const { getByTestId } = render(
      <SavingsGoals savingsGoals={goals} onNavigateToSettings={onSettings} />,
    );
    fireEvent.press(getByTestId("savings-goals-settings"));
    expect(onSettings).toHaveBeenCalled();
  });

  it("invokes onRenameGoal after editing title and confirming", () => {
    const onRenameGoal = jest.fn();
    const { getByTestId } = render(
      <SavingsGoals savingsGoals={goals} onRenameGoal={onRenameGoal} />,
    );
    fireEvent.press(getByTestId("meter-card-edit-Emergency"));
    const titleInput = getByTestId("meter-card-title-input-Emergency");
    fireEvent.changeText(titleInput, "Rainy day fund");
    fireEvent(titleInput, "submitEditing");

    expect(onRenameGoal).toHaveBeenCalledWith("Emergency", "Rainy day fund");
  });

  it("invokes onDeleteGoal after confirming delete in the modal", () => {
    const onDeleteGoal = jest.fn();
    const { getByTestId, getByText } = render(
      <SavingsGoals savingsGoals={goals} onDeleteGoal={onDeleteGoal} />,
    );
    fireEvent.press(getByTestId("meter-card-delete-Emergency"));
    fireEvent.press(getByText("Delete"));
    expect(onDeleteGoal).toHaveBeenCalledWith("Emergency");
  });
});

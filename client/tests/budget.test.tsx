// 5 Budget Tests
import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import Budget from "../app/tabs/budget";
import { useAuth } from "@clerk/clerk-expo";

jest.mock("@clerk/clerk-expo", () => ({
  useAuth: jest.fn(),
}));

global.fetch = jest.fn();

describe("Budget Component", () => {
  const mockGetToken = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      getToken: mockGetToken.mockResolvedValue("mock-token"),
      isSignedIn: true,
    });
  });

  it("shows a loading indicator while fetching data initially", async() => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    const { getByTestId } = render(<Budget />);
    
    await waitFor(() => {
              const icon = getByTestId("loading-indicator");
              expect(icon).toBeTruthy()
        });
  });

  it("displays the empty budget view and empty transactions when no budget data is returned", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    const { getAllByText } = render(<Budget />);

    await waitFor(() => {
      const emptyMessages = getAllByText("No transactions yet.");
      expect(emptyMessages.length).toBe(2);
    });
  });

  it("renders budget data correctly when data is successfully fetched", async () => {
    const mockBudget = {
      month: "May 2026",
      totalIncome: 4000,
      totalBills: 1500,
      splitStrategy: { needs: 0.5, wants: 0.3, savings: 0.2 },
      needsItems: [],
    };

    (global.fetch as jest.Mock).mockImplementation((url) => {
      if (url.includes("/api/budget/me")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockBudget),
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    const { getByText } = render(<Budget />);

    await waitFor(() => {
      expect(getByText("May 2026")).toBeTruthy();
    });
  });

  it("renders top purchases and recurring charges when transactions exist", async () => {
    const mockBudget = {
      month: "May 2026",
      totalIncome: 4000,
      splitStrategy: { needs: 0.5, wants: 0.3, savings: 0.2 },
    };
    const mockTopPurchases = [
      { _id: "1", name: "Apple Store", date: "2026-05-10", amount: 1200 },
    ];
    const mockRecurring = [{ _id: "Spotify", count: 3, totalAmount: 30 }];

    (global.fetch as jest.Mock).mockImplementation((url) => {
      if (url.includes("/api/budget/me"))
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockBudget),
        });
      if (url.includes("/api/transaction/top"))
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTopPurchases),
        });
      if (url.includes("/api/transaction/repeat"))
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockRecurring),
        });
      return Promise.resolve({ ok: false });
    });

    const { getByText } = render(<Budget />);

    await waitFor(() => {
      expect(getByText(/Apple Store/i)).toBeTruthy();
      expect(getByText(/average \$10/i)).toBeTruthy(); 
    });
  });

  it("triggers the settings navigation function when the settings icon is pressed", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ 
      ok: true, 
      json: () => Promise.resolve([]) 
    });
    
    const mockNavigateSettings = jest.fn();
    const { getByTestId } = render(<Budget onNavigateToSettings={mockNavigateSettings} />);

    const settingsButton = await waitFor(() => getByTestId("settings-button"));
    
    fireEvent.press(settingsButton);

    expect(mockNavigateSettings).toHaveBeenCalled();
  });
});
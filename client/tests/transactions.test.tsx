import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import Transactions from "../app/tabs/transactions";
import { useAuth } from "@clerk/clerk-expo";

jest.mock("@clerk/clerk-expo", () => ({
  useAuth: jest.fn(),
}));

global.fetch = jest.fn();

describe("Transaction Component", () => {
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


    const { getByTestId } = render(<Transactions />);
    await waitFor(() => {
          const icon = getByTestId("loading-indicator");
          expect(icon).toBeTruthy()
    });
    
  });

   it("displays the empty transactions when no transaction data is returned", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
  
      const { getAllByText } = render(<Transactions />);
  
      await waitFor(() => {
        const emptyMessages = getAllByText("No transactions yet.");
        expect(emptyMessages.length).toBe(1);
      });
    });

    it("renders transactions when transaction data exists", async () => {

        const mockTransaction= [
            { _id: "1", name: "Groceries", date: "2026-04-10", amount: 300 },
        ];


        (global.fetch as jest.Mock).mockImplementation((url) => {
            if (url.includes("/api/transactions/me"))
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockTransaction),
            });
            return Promise.resolve({ ok: false });
            });

            const { getByText } = render(<Transactions />);

            await waitFor(() => {
                expect(getByText(/Groceries/i)).toBeTruthy();
            });
    });

    it("Displays add transaction pop up when the add icon is pressed", async () => {
        (global.fetch as jest.Mock).mockResolvedValue({ 
          ok: true, 
          json: () => Promise.resolve([]) 
        });
        
        const { getByTestId, getAllByText } = render(<Transactions />);
    
        const addButton = await waitFor(() => getByTestId("add-button"));
        
        fireEvent.press(addButton);
    
        expect(getAllByText(/Add Transaction/i).length).toBe(2);
      });

    it("Displays filter transaction pop up when the filter icon is pressed", async () => {
        (global.fetch as jest.Mock).mockResolvedValue({ 
          ok: true, 
          json: () => Promise.resolve([]) 
        });
        
        const { getByTestId, getAllByText } = render(<Transactions />);
    
        const filterButton = await waitFor(() => getByTestId("filter-button"));
        
        fireEvent.press(filterButton);
    
        expect(getAllByText(/Filter Transaction/i).length).toBe(2);
      });
});

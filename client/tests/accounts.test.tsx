import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Accounts from "../app/tabs/accounts";

describe("Accounts", () => {
  it("renders the screen title", () => {
    const { getByText } = render(<Accounts />);
    expect(getByText("Accounts")).toBeTruthy();
  });

  it("renders account category headers", () => {
    const { getByText } = render(<Accounts />);
    expect(getByText("CASH")).toBeTruthy();
    expect(getByText("CREDIT CARD")).toBeTruthy();
    expect(getByText("INVESTMENTS")).toBeTruthy();
  });

  it("renders cash accounts with labels, types, and balances", () => {
    const { getByText } = render(<Accounts />);
    expect(getByText("Jane's Checking")).toBeTruthy();
    expect(getByText("Checking")).toBeTruthy();
    expect(getByText("$600")).toBeTruthy();
    expect(getByText("Jane's Savings")).toBeTruthy();
    expect(getByText("Savings")).toBeTruthy();
    expect(getByText("$1000")).toBeTruthy();
  });

  it("renders credit card accounts", () => {
    const { getByText } = render(<Accounts />);
    expect(getByText("Quicksilver")).toBeTruthy();
    expect(getByText("Travel Rewards")).toBeTruthy();
    expect(getByText("PNC")).toBeTruthy();
    expect(getByText("$500")).toBeTruthy();
    expect(getByText("$0")).toBeTruthy();
    expect(getByText("$100")).toBeTruthy();
  });

  it("renders investment accounts", () => {
    const { getByText } = render(<Accounts />);
    expect(getByText("Roth IRA")).toBeTruthy();
    expect(getByText("Robinhood")).toBeTruthy();
    expect(getByText("$15000")).toBeTruthy();
  });

  it("expands a collapsible row to show placeholder content", () => {
    const { getByText, queryByText } = render(<Accounts />);
    expect(queryByText("Sample Text")).toBeNull();

    fireEvent.press(getByText("Jane's Checking"));

    expect(getByText("Sample Text")).toBeTruthy();
  });
});

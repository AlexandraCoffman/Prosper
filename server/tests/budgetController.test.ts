import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import Budget from "../src/models/Budget.model";
import {
  getBudget,
  getMyBudget,
  upsertBudget,
} from "../src/controllers/budgetController";

jest.mock("@clerk/express", () => ({
  getAuth: jest.fn(),
}));

jest.mock("../src/models/Budget.model", () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
  },
}));

function mockRes() {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  return { json, status, res: { status, json } as unknown as Response };
}

describe("budgetController", () => {
  const findOne = Budget.findOne as jest.Mock;
  const findOneAndUpdate = Budget.findOneAndUpdate as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getBudget", () => {
    it("returns 404 when no budget exists for userId", async () => {
      findOne.mockResolvedValue(null);
      const { status, json, res } = mockRes();
      const req = { params: { userId: "u99" } } as unknown as Request;

      await getBudget(req, res);

      expect(findOne).toHaveBeenCalledWith({ userId: "u99" });
      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({ message: "No budget found" });
    });

    it("returns the budget document", async () => {
      const doc = { userId: "u99", month: "April 2026" };
      findOne.mockResolvedValue(doc);
      const { json, res } = mockRes();
      await getBudget({ params: { userId: "u99" } } as unknown as Request, res);
      expect(json).toHaveBeenCalledWith(doc);
    });
  });

  describe("getMyBudget", () => {
    it("uses Clerk auth userId and returns 404 when missing", async () => {
      (getAuth as jest.Mock).mockReturnValue({ userId: "me" });
      findOne.mockResolvedValue(null);
      const { status, json, res } = mockRes();

      await getMyBudget({} as Request, res);

      expect(findOne).toHaveBeenCalledWith({ userId: "me" });
      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({ message: "No budget found" });
    });
  });

  describe("upsertBudget", () => {
    it("persists body fields and returns the saved document", async () => {
      const payload = {
        userId: "me",
        month: "April 2026",
        needsItems: [],
        totalIncome: 4000,
        totalBills: 1000,
        splitStrategy: { needs: 0.5, wants: 0.3, savings: 0.2 },
      };
      const saved = { ...payload, _id: "id1" };
      findOneAndUpdate.mockResolvedValue(saved);
      const { json, res } = mockRes();
      const req = { body: payload } as unknown as Request;

      await upsertBudget(req, res);

      expect(findOneAndUpdate).toHaveBeenCalledWith(
        { userId: "me" },
        {
          month: payload.month,
          needsItems: payload.needsItems,
          totalIncome: payload.totalIncome,
          totalBills: payload.totalBills,
          splitStrategy: payload.splitStrategy,
        },
        { new: true, upsert: true },
      );
      expect(json).toHaveBeenCalledWith(saved);
    });
  });
});

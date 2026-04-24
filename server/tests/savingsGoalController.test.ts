import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import Savings from "../src/models/Savings.model";
import {
  getSavingsGoals,
  upsertSavingsGoals,
} from "../src/controllers/savingsGoalController";

jest.mock("@clerk/express", () => ({
  getAuth: jest.fn(),
}));

jest.mock("../src/models/Savings.model", () => ({
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

describe("savingsGoalController", () => {
  const findOne = Savings.findOne as jest.Mock;
  const findOneAndUpdate = Savings.findOneAndUpdate as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (getAuth as jest.Mock).mockReturnValue({ userId: "user_1" });
  });

  describe("getSavingsGoals", () => {
    it("returns an empty goals array when no document exists", async () => {
      findOne.mockResolvedValue(null);
      const { status, json, res } = mockRes();
      const req = {} as Request;

      await getSavingsGoals(req, res);

      expect(findOne).toHaveBeenCalledWith({ userId: "user_1" });
      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({ goals: [] });
    });

    it("returns goals from the savings document", async () => {
      const goals = [
        {
          title: "A",
          accountName: "x",
          monthlyDeposit: 1,
          amountSaved: 0,
          amountRemaining: 10,
          projectedCompletionDate: "01/01/2026",
        },
      ];
      findOne.mockResolvedValue({ goals });
      const { status, json, res } = mockRes();
      await getSavingsGoals({} as Request, res);
      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({ goals });
    });
  });

  describe("upsertSavingsGoals", () => {
    it("returns 400 when goals is not an array", async () => {
      const { status, json, res } = mockRes();
      const req = { body: { goals: "nope" } } as unknown as Request;

      await upsertSavingsGoals(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({ error: "goals must be an array" });
      expect(findOneAndUpdate).not.toHaveBeenCalled();
    });

    it("upserts and returns saved goals", async () => {
      const saved = [
        {
          title: "B",
          accountName: "y",
          monthlyDeposit: 2,
          amountSaved: 1,
          amountRemaining: 9,
          projectedCompletionDate: "02/02/2026",
        },
      ];
      findOneAndUpdate.mockResolvedValue({ goals: saved });
      const { status, json, res } = mockRes();
      const req = { body: { goals: saved } } as unknown as Request;

      await upsertSavingsGoals(req, res);

      expect(findOneAndUpdate).toHaveBeenCalledWith(
        { userId: "user_1" },
        { goals: saved },
        { new: true, upsert: true },
      );
      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({ goals: saved });
    });
  });
});

import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { requireClerkAuth } from "../src/middleware/clerkAuth";

jest.mock("@clerk/express", () => ({
  getAuth: jest.fn(),
}));

describe("requireClerkAuth", () => {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  const res = { status, json } as unknown as Response;
  const next = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("responds 401 when Clerk userId is missing", () => {
    (getAuth as jest.Mock).mockReturnValue({ userId: null });
    requireClerkAuth({} as Request, res, next);
    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({ error: "Unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next when userId is present", () => {
    (getAuth as jest.Mock).mockReturnValue({ userId: "user_ok" });
    requireClerkAuth({} as Request, res, next);
    expect(next).toHaveBeenCalled();
    expect(status).not.toHaveBeenCalled();
  });
});

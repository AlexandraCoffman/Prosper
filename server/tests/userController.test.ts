import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import User from "../src/models/User.model";
import { seedUserData } from "../src/utils/seedUserData";
import { getMe, createUser } from "../src/controllers/userController";

jest.mock("@clerk/express", () => ({
  getAuth: jest.fn(),
}));

jest.mock("../src/models/User.model", () => {
  const save = jest.fn().mockResolvedValue(undefined);
  const findOne = jest.fn();
  const Ctor = jest.fn().mockImplementation(() => ({
    id: "clerk_1",
    first_name: "Sam",
    save,
  }));
  return {
    __esModule: true,
    default: Object.assign(Ctor, { findOne }),
  };
});

jest.mock("../src/utils/seedUserData", () => ({
  seedUserData: jest.fn().mockResolvedValue(undefined),
}));

type UserModule = typeof User & { findOne: jest.Mock };

function mockRes() {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  return { json, status, res: { status, json } as unknown as Response };
}

describe("userController", () => {
  const UserModel = User as UserModule;

  beforeEach(() => {
    jest.clearAllMocks();
    (getAuth as jest.Mock).mockReturnValue({ userId: "clerk_1" });
  });

  describe("getMe", () => {
    it("returns 404 when user is not in the database", async () => {
      UserModel.findOne.mockResolvedValue(null);
      const { status, json, res } = mockRes();

      await getMe({} as Request, res);

      expect(UserModel.findOne).toHaveBeenCalledWith({ id: "clerk_1" });
      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({ error: "User not found" });
    });

    it("returns public profile fields", async () => {
      UserModel.findOne.mockResolvedValue({
        first_name: "Pat",
        last_name: "Lee",
        email: "p@example.com",
        life_info: [],
        support: [],
        goals: [],
      });
      const { json, res } = mockRes();

      await getMe({} as Request, res);

      expect(json).toHaveBeenCalledWith({
        first_name: "Pat",
        last_name: "Lee",
        email: "p@example.com",
        life_info: [],
        support: [],
        goals: [],
      });
    });
  });

  describe("createUser", () => {
    it("returns 409 when user already exists", async () => {
      UserModel.findOne.mockResolvedValue({ id: "clerk_1" });
      const { status, json, res } = mockRes();

      await createUser({ body: {} } as Request, res);

      expect(status).toHaveBeenCalledWith(409);
      expect(json).toHaveBeenCalledWith({ error: "User already exists" });
    });

    it("creates a user, seeds data, and returns 201", async () => {
      UserModel.findOne.mockResolvedValue(null);
      const { status, json, res } = mockRes();

      await createUser(
        {
          body: {
            first_name: "Sam",
            last_name: "Smith",
            email: "sam@example.com",
          },
        } as unknown as Request,
        res,
      );

      expect(UserModel).toHaveBeenCalled();
      const instance = (UserModel as unknown as jest.Mock).mock.results[0]
        ?.value as { save: jest.Mock };
      expect(instance.save).toHaveBeenCalled();
      expect(seedUserData).toHaveBeenCalledWith("clerk_1");
      expect(status).toHaveBeenCalledWith(201);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: "clerk_1",
          first_name: "Sam",
        }),
      );
    });
  });
});

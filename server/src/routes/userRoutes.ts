import express from "express";
import { createUser, getMe } from "../controllers/userController";
import { requireClerkAuth } from "../middleware/clerkAuth";

const router = express.Router();

router.get("/users/me", requireClerkAuth, getMe);
router.post("/users", requireClerkAuth, createUser);

export default router;

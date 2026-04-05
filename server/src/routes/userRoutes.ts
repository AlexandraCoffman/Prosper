import express from "express";
import { createUser } from "../controllers/userController";
import { requireClerkAuth } from "../middleware/clerkAuth";

const router = express.Router();

router.post("/users", requireClerkAuth, createUser);

export default router;

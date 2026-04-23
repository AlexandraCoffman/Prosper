import express from "express";
import {
  getSavingsGoals,
  upsertSavingsGoals,
} from "../controllers/savingsGoalController";
import { requireClerkAuth } from "../middleware/clerkAuth";

const router = express.Router();

router.get("/savings-goals", requireClerkAuth, getSavingsGoals);
router.put("/savings-goals", requireClerkAuth, upsertSavingsGoals);

export default router;

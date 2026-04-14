import express from "express";
import { getLearnData, completeLesson } from "../controllers/learnController";
import { requireClerkAuth } from "../middleware/clerkAuth";

const router = express.Router();

router.get("/learn", requireClerkAuth, getLearnData);
router.post("/learn/complete", requireClerkAuth, completeLesson);

export default router;

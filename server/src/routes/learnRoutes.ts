import express from "express";
import { getLearnData } from "../controllers/learnController";
import { requireClerkAuth } from "../middleware/clerkAuth";

const router = express.Router();

router.get("/learn", requireClerkAuth, getLearnData);

export default router;

import express from 'express';
import { getBudget, getMyBudget, upsertBudget } from '../controllers/budgetController';
import { requireClerkAuth } from '../middleware/clerkAuth';

const router = express.Router();

router.get('/budget/me', requireClerkAuth, getMyBudget);
router.get('/budget/:userId', getBudget);
router.post('/budget', upsertBudget);

export default router;
import express from 'express';
import { getBudget, upsertBudget } from '../controllers/budgetController';

const router = express.Router();

router.get('/budget/:userId', getBudget);
router.post('/budget', upsertBudget);

export default router;
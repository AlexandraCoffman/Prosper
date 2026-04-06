import express from 'express';
import {
  getMyTransactions,
  getTransactions,
  addTransaction,
  deleteTransaction,
  filterTransaction,
} from "../controllers/transactionController";
import { requireClerkAuth } from '../middleware/clerkAuth';

const router = express.Router();

router.get('/transactions/me', requireClerkAuth, getMyTransactions);
router.get('/transactions/:userid', getTransactions);
router.post('/transactions/', addTransaction);
router.delete('/transactions/:id', deleteTransaction);
router.get('/transactions/filter', filterTransaction);

export default router;
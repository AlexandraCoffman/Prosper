import express from 'express';
import {
  getMyTransactions,
  addTransaction,
  deleteTransaction,
  filterTransaction,
  topCharges,
  repeatingCharges,
} from "../controllers/transactionController";
import { requireClerkAuth } from '../middleware/clerkAuth';

const router = express.Router();

router.get('/transactions/me', requireClerkAuth, getMyTransactions);
router.post('/transactions/', requireClerkAuth, addTransaction);
router.delete('/transactions/:id', requireClerkAuth, deleteTransaction);
router.get('/transactions/top', requireClerkAuth, topCharges);
router.get('/transactions/repeat',requireClerkAuth, repeatingCharges);
router.get('/transactions/filter/:category/:type', requireClerkAuth, filterTransaction);

export default router;
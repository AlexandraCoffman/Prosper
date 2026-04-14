import express from 'express';
import {
  getMyTransactions,
  getTransactions,
  addTransaction,
  deleteTransaction,
  filterTransaction,
  topCharges,
  repeatingCharges,
} from "../controllers/transactionController";
import { requireClerkAuth } from '../middleware/clerkAuth';

const router = express.Router();

router.get('/transactions/me', requireClerkAuth, getMyTransactions);
router.get('/transactions/:userid', getTransactions);
router.post('/transactions/',requireClerkAuth, addTransaction);
router.delete('/transactions/:id', requireClerkAuth, deleteTransaction);
router.get('/transactions/filter', requireClerkAuth, filterTransaction);
router.get('/transactions/top', requireClerkAuth, topCharges);
router.get('/transactions/repeat',requireClerkAuth, repeatingCharges);

export default router;
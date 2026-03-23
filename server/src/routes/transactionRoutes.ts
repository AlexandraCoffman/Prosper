import express from 'express';
import { getTransactions, addTransaction, deleteTransaction, filterTransaction } from '../controllers/transactionController.ts';

const router = express.Router();

router.get('transactions/', getTransactions);
router.post('transactions/', addTransaction);
router.delete('transactions/:id', deleteTransaction);
router.get('transactions/filter', filterTransaction);

export default router;
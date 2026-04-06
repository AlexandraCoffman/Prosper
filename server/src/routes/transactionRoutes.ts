import express from 'express';
import { getTransactions, addTransaction, deleteTransaction, filterTransaction } from '../controllers/transactionController.ts';

const router = express.Router();

router.get('/:id', getTransactions);
router.post('/', addTransaction);
router.delete('/:id', deleteTransaction);
router.get('/filter', filterTransaction);

export default router;
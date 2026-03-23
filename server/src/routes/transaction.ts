import express from 'express';
import { getTransactions, addTransaction, deleteTransaction, filterTransaction } 
from '../controllers/transactionController.js';

const router = express.Router();

router.get('/', getTransactions);
router.post('/', addTransaction);
router.put('/:id', deleteTransaction);
router.delete('/:id', filterTransaction);

export default router;
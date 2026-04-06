import Transaction from '../models/Transaction.model.ts'
import { Request, Response } from 'express';

export const getTransactions = async (req: Request, res: Response) => {
    try {
        const id  = req.params.id;
        const transactions = await Transaction.find({userid: id }, 'name date amount')
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const addTransaction = async (req: Request, res: Response) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const request = req.body;
        await Transaction.findByIdAndDelete(userId, request ).select("name date amount");
        res.status(200).json({ message: "Transaction deleted" });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const filterTransaction = async (req: Request, res: Response) => {
    try {
        const { userid } = req.params;
        const transactions = await Transaction.findById(userid);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error });
    }
};

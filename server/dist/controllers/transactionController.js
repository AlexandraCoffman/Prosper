"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTransaction = exports.deleteTransaction = exports.addTransaction = exports.getTransactions = exports.getMyTransactions = void 0;
const Transaction_model_1 = __importDefault(require("../models/Transaction.model"));
const express_1 = require("@clerk/express");
const getMyTransactions = async (req, res) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        const transactions = await Transaction_model_1.default.find({ userid: userId }).sort({ date: -1 });
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getMyTransactions = getMyTransactions;
const getTransactions = async (req, res) => {
    try {
        const { userid } = req.params;
        const transactions = await Transaction_model_1.default.find({ userid });
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getTransactions = getTransactions;
const addTransaction = async (req, res) => {
    try {
        const transaction = new Transaction_model_1.default(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.addTransaction = addTransaction;
const deleteTransaction = async (req, res) => {
    try {
        const { userId } = req.params;
        const request = req.body;
        await Transaction_model_1.default.findByIdAndDelete(userId, request).select("name date amount");
        res.status(200).json({ message: "Transaction deleted" });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.deleteTransaction = deleteTransaction;
const filterTransaction = async (req, res) => {
    try {
        const { userid } = req.params;
        const transactions = await Transaction_model_1.default.findById(userid);
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.filterTransaction = filterTransaction;

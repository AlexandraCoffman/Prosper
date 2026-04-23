"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertBudget = exports.getMyBudget = exports.getBudget = void 0;
const express_1 = require("@clerk/express");
const Budget_model_1 = __importDefault(require("../models/Budget.model"));
const getBudget = async (req, res) => {
    try {
        const { userId } = req.params;
        const budget = await Budget_model_1.default.findOne({ userId });
        if (!budget) {
            return res.status(404).json({ message: "No budget found" });
        }
        res.status(200).json(budget);
    }
    catch (error) {
        res.status(500).json({ error: "Server error fetching budget" });
    }
};
exports.getBudget = getBudget;
const getMyBudget = async (req, res) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        const budget = await Budget_model_1.default.findOne({ userId });
        if (!budget) {
            return res.status(404).json({ message: "No budget found" });
        }
        res.status(200).json(budget);
    }
    catch (error) {
        res.status(500).json({ error: "Server error fetching budget" });
    }
};
exports.getMyBudget = getMyBudget;
const upsertBudget = async (req, res) => {
    try {
        const { userId, month, needsItems, totalIncome, totalBills, splitStrategy } = req.body;
        const budget = await Budget_model_1.default.findOneAndUpdate({ userId }, { month, needsItems, totalIncome, totalBills, splitStrategy }, { new: true, upsert: true });
        res.status(200).json(budget);
    }
    catch (error) {
        res.status(500).json({ error: "Server error saving budget" });
    }
};
exports.upsertBudget = upsertBudget;

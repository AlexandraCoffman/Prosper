"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertSavingsGoals = exports.getSavingsGoals = void 0;
const express_1 = require("@clerk/express");
const Savings_model_1 = __importDefault(require("../models/Savings.model"));
const getSavingsGoals = async (req, res) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        const doc = await Savings_model_1.default.findOne({ userId });
        if (!doc) {
            res.status(200).json({ goals: [] });
            return;
        }
        res.status(200).json({ goals: doc.goals });
    }
    catch (error) {
        res.status(500).json({ error: "Server error fetching savings goals" });
    }
};
exports.getSavingsGoals = getSavingsGoals;
const upsertSavingsGoals = async (req, res) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        const { goals } = req.body;
        if (!Array.isArray(goals)) {
            res.status(400).json({ error: "goals must be an array" });
            return;
        }
        const doc = await Savings_model_1.default.findOneAndUpdate({ userId }, { goals }, { new: true, upsert: true });
        res.status(200).json({ goals: doc.goals });
    }
    catch (error) {
        res.status(500).json({ error: "Server error saving savings goals" });
    }
};
exports.upsertSavingsGoals = upsertSavingsGoals;

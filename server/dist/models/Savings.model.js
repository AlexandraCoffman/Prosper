"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SavingsGoalSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    accountName: { type: String, required: true },
    monthlyDeposit: { type: Number, required: true },
    amountSaved: { type: Number, required: true },
    amountRemaining: { type: Number, required: true },
    projectedCompletionDate: { type: String, required: true },
}, { _id: false });
const SavingsSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, unique: true },
    goals: { type: [SavingsGoalSchema], default: [] },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Savings", SavingsSchema);

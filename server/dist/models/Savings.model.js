"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SavingsSchema = new mongoose_1.default.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    account_id: {
        type: Number,
        required: true,
        unique: true,
    },
    goal_id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});
const Savings = mongoose_1.default.model("Savings", SavingsSchema);
exports.default = Savings;

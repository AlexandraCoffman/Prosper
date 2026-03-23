"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BudgetSchema = new mongoose_1.default.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    income: {
        type: String,
        required: true,
    },
    expense: {
        type: Date,
        required: true,
    },
    budget: {
        type: (Array),
        required: true,
        default: [],
    },
});
const Budget = mongoose_1.default.model("Budget", BudgetSchema);
exports.default = Budget;

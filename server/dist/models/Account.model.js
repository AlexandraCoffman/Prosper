"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AccountSchema = new mongoose_1.default.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    account_id: {
        type: String,
        required: true,
    },
    company: {
        type: Date,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
});
const Account = mongoose_1.default.model("Account", AccountSchema);
exports.default = Account;

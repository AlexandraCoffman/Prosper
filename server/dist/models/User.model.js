"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    life_info: {
        type: [String],
        default: [],
    },
    support: {
        type: [String],
        default: [],
    },
    goals: {
        type: [String],
        required: true,
        default: [],
    },
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;

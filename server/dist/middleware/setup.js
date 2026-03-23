"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const setup = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("URI not found in environment variables");
    }
    await mongoose_1.default.connect(uri);
    console.log("Connected to MongoDB");
};
exports.default = setup;

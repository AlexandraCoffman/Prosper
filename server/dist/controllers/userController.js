"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getMe = void 0;
const express_1 = require("@clerk/express");
const User_model_1 = __importDefault(require("../models/User.model"));
const seedUserData_1 = require("../utils/seedUserData");
const getMe = async (req, res) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        const user = await User_model_1.default.findOne({ id: userId });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            life_info: user.life_info,
            support: user.support,
            goals: user.goals,
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getMe = getMe;
const createUser = async (req, res) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        const { first_name, last_name, email, life_info, support, goals } = req.body;
        const existing = await User_model_1.default.findOne({ id: userId });
        if (existing) {
            res.status(409).json({ error: "User already exists" });
            return;
        }
        const user = new User_model_1.default({
            id: userId,
            first_name,
            last_name,
            email,
            life_info: life_info ?? [],
            support: support ?? [],
            goals: goals ?? [],
        });
        await user.save();
        try {
            await (0, seedUserData_1.seedUserData)(userId);
        }
        catch (seedErr) {
            console.error("Failed to seed sample data for new user:", seedErr);
        }
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.createUser = createUser;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const savingsGoalController_1 = require("../controllers/savingsGoalController");
const clerkAuth_1 = require("../middleware/clerkAuth");
const router = express_1.default.Router();
router.get("/savings-goals", clerkAuth_1.requireClerkAuth, savingsGoalController_1.getSavingsGoals);
router.put("/savings-goals", clerkAuth_1.requireClerkAuth, savingsGoalController_1.upsertSavingsGoals);
exports.default = router;

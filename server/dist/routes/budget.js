"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const budgetController_1 = require("../controllers/budgetController");
const clerkAuth_1 = require("../middleware/clerkAuth");
const router = express_1.default.Router();
router.get('/budget/me', clerkAuth_1.requireClerkAuth, budgetController_1.getMyBudget);
router.get('/budget/:userId', budgetController_1.getBudget);
router.post('/budget', budgetController_1.upsertBudget);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const clerkAuth_1 = require("../middleware/clerkAuth");
const router = express_1.default.Router();
router.get('/transactions/me', clerkAuth_1.requireClerkAuth, transactionController_1.getMyTransactions);
router.get('/transactions/:userid', transactionController_1.getTransactions);
router.post('/transactions/', transactionController_1.addTransaction);
router.delete('/transactions/:id', transactionController_1.deleteTransaction);
router.get('/transactions/filter', transactionController_1.filterTransaction);
exports.default = router;

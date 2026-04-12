"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const clerkAuth_1 = require("../middleware/clerkAuth");
const router = express_1.default.Router();
router.get("/users/me", clerkAuth_1.requireClerkAuth, userController_1.getMe);
router.post("/users", clerkAuth_1.requireClerkAuth, userController_1.createUser);
exports.default = router;

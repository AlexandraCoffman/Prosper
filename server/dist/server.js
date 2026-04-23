"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("@clerk/express");
const setup_1 = __importDefault(require("./middleware/setup"));
const dotenv_1 = __importDefault(require("dotenv"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const budget_1 = __importDefault(require("./routes/budget"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const savingsGoalRoutes_1 = __importDefault(require("./routes/savingsGoalRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_2.clerkMiddleware)());
app.get("/api/test", (req, res) => {
    res.json({ message: "Test" });
});
app.use("/api", budget_1.default);
app.use("/api", userRoutes_1.default);
app.use("/api", transactionRoutes_1.default);
app.use("/api", savingsGoalRoutes_1.default);
app.use((req, res) => {
    res.status(404).json({ error: "API Route not found" });
});
const start = async () => {
    await (0, setup_1.default)();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
    });
};
start();
exports.default = app;

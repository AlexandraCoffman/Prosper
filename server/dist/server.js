"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const setup_1 = __importDefault(require("./middleware/setup"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/api/test", (req, res) => {
    res.json({ message: "Test" });
});
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

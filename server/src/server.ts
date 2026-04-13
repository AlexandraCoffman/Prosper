import express, { Request, Response, Application } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import setup from "./middleware/setup";
import dotenv from "dotenv";
import transactionRoutes from "./routes/transactionRoutes";
import budgetRoutes from "./routes/budget";
import userRoutes from "./routes/userRoutes";
import savingsGoalRoutes from "./routes/savingsGoalRoutes";
import learnRoutes from "./routes/learnRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "Test" });
});
app.use("/api", budgetRoutes);
app.use("/api", userRoutes);
app.use("/api", transactionRoutes);
app.use("/api", savingsGoalRoutes);
app.use("/api", learnRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "API Route not found" });
});

const start = async () => {
  await setup();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
  });
};

start();

export default app;

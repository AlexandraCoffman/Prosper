import express, { Request, Response, Application } from "express";
import cors from "cors";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "Test" });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "API Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
});

export default app;

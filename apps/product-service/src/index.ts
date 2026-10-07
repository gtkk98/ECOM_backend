import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
const startedAt = Date.now();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
  }),
);

app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    uptime: Math.floor((Date.now() - startedAt) / 1000),
    timestamp: Date.now(),
  });
});

app.get("/test", (req, res) => {
  const auth = getAuth(req);
  const userId = auth.userId;

  if (!userId) {
    return res.status(401).json({ message: "You are not logged in!" });
  }
  res.json({ message: "Product service authenticated" });
});

app.listen(8000, () => {
  console.log("Product Service is running");
});

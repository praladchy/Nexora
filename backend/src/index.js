import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDb } from "./config/db.config.js";
import { authRouter } from "./route/auth.router.js";

const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:6000"],
    credentials: true,
  })
)
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

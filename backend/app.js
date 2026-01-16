import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

// Config env
dotenv.config();

// Create express app
const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

export default app;

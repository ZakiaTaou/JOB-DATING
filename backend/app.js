import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import candidateRoutes from './routes/candidateRoutes.js';
import recruiterRoutes from './routes/recruiterRoutes.js';

// Config env
dotenv.config();

// Create express app
const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/candidates', candidateRoutes);  // ← NOUVEAU
app.use('/api/recruiters', recruiterRoutes);   // ← NOUVEAU


export default app;

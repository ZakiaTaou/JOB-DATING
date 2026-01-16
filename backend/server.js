import express from "express";
import dotenv from "dotenv";
import { connectionDb } from "./config/database.js";
import "./models/index.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 5000;

//  Routes
app.use("/api/auth", authRoutes);
app.listen(PORT, async () => {
  await connectionDb();
  console.log(`Serveur démarré sur le port ${PORT}`);
});
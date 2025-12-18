import express from "express";
import dotenv from "dotenv";
import { connectionDb } from "./config/database.js";

const app = express();

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectionDb();
  console.log(`Serveur démarré sur le port ${PORT}`);
});
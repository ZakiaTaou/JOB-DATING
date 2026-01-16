import app from "./app.js";
import { connectionDb } from "./config/database.js";
import "./models/index.js";




const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectionDb();
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error("Erreur lors du démarrage du serveur:", error);
  }
};

startServer();
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        port: process.env.DB_PORT || 5432,
        logging:false,
    }
    ); 
export const connectionDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Connexion à PostgreSQL réussie!");
  } catch (error) {
    console.error(
      "Erreur de connexion à la base de données:",
      error.message
    );
    process.exit(1);
  }
}; 
export default sequelize;

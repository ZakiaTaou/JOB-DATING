import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Non autorisé, token manquant",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Non autorisé, token invalide",
      });
    }
  } catch (error) {
    console.error("Erreur dans le middleware d'authentification:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur dans le middleware d'authentification",
      error: error.message,
    });
  }
};

export const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message:
        `Le rôle ${req.user.role} n'est pas autorisé à accéder à cette ressource`,
      });
    }
    next();
  };
};

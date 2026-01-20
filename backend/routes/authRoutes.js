import express from "express";
import {
  registerValidation,
  loginValidation,
  validate,
} from "../middlewares/validationMiddleware.js";
import {
  register,
  login,
  getProfile,
  logout,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route d'inscription
router.post("/register", registerValidation, validate, register);
// Route de connexion
router.post("/login", loginValidation, validate, login);
// Route pour récupérer le profil de l'utilisateur connecté
router.get("/profile", protect ,getProfile);
// Route de déconnexion
router.post("/logout", protect,logout);

export default router;
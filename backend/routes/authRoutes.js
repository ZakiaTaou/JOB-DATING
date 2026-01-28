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

router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.get("/profile", protect ,getProfile);
router.post("/logout", protect,logout);

export default router;
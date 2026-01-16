import { User, Candidate, Recruiter } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Générer un token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Inscription d'un utilisateur
export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "Utilisateur déjà existant",
      });
    }

    // Créer un nouvel utilisateur
    const user = await User.create({ email, password, role });

    // Générer un token JWT
    const token = generateToken(user.id);
    res.status(201).json({
      success: true,
      message: "Utilisateur créé avec succès",
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de l'inscription",
      error: error.message,
    });
  }
};
//  Connexion d'un utilisateur
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect",
      });
    }
    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect",
      });
    }

    // Générer un token JWT
    const token = generateToken(user.id);
    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la connexion",
      error: error.message,
    });
  }
};

// Récupérer le profil de l'utilisateur connecté
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log(userId);
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
      include: [
        { model: Candidate, as: "candidateProfile" },
        { model: Recruiter, as: "recruiterProfile" },
      ],
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la récupération du profil",
      error: error.message,
    });
  }
};

// Déconnexion de l'utilisateur 
export const logout = async (req, res) => {
  try {
    // Pour une API RESTful, la déconnexion côté serveur est souvent gérée côté client
    res.status(200).json({
        success: true,  
        message: "Déconnexion réussie",
    });
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la déconnexion",
        error: error.message,
    });
  }
}; 
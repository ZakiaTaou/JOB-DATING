import { body, validationResult } from "express-validator";

// Middleware de validation pour l'inscription
export const validate = (req, res, next) => {
  const erreur = validationResult(req);
  if (!erreur.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Erreur de validation",
      errors: erreur
        .array()
        .map((err) => ({ field: err.path, message: err.msg })),
    });
  }
    next();
};

// Règles de validation pour l'inscription
export const registerValidation =  [
  body('email')
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères')
    .matches(/\d/)
    .withMessage('Le mot de passe doit contenir au moins un chiffre'),
  body('role')
    .isIn(['candidate', 'recruiter'])
    .withMessage('Le rôle doit être "candidate" ou "recruiter"')
];

// Règles de validation pour la connexion
export const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),
    body('password')
    .notEmpty()
    .withMessage('Le mot de passe est requis')
];
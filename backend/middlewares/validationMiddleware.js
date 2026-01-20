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

// Validation registration
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

// Validation connexion
export const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),
    body('password')
    .notEmpty()
    .withMessage('Le mot de passe est requis')
];


// Validation profil candidat
export const candidateProfileValidation = [
  body('firstName')
    .notEmpty()
    .withMessage('Le prénom est requis')
    .trim(),
  body('lastName')
    .notEmpty()
    .withMessage('Le nom est requis')
    .trim(),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Numéro de téléphone invalide'),
  body('skills')
    .optional()
    .isArray()
    .withMessage('Les compétences doivent être un tableau'),
  body('availability')
    .optional()
    .isIn(['immediate', '1-months', '2-months', '3-months'])
    .withMessage('Disponibilité invalide')
];

// Validation profil recruteur
export const recruiterProfileValidation = [
  body('companyName')
    .notEmpty()
    .withMessage('Le nom de l\'entreprise est requis')
    .trim(),
  body('description')
    .notEmpty()
    .withMessage('La description est requise')
    .trim()
    .isLength({ min: 50 })
    .withMessage('La description doit contenir au moins 50 caractères'),
  body('website')
    .optional()
    .isURL()
    .withMessage('URL du site web invalide'),
  body('companySize')
    .optional()
    .isIn(['1-10', '11-50', '51-200', '201-500', '500+'])
    .withMessage('Taille d\'entreprise invalide')
];
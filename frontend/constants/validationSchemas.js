import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre"),
  role: z.enum(["candidate", "recruiter"], {
    errorMap: () => ({ message: "Veuillez sélectionner un rôle valide" }),
  }),
});

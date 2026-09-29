import { z } from "zod";
const password = z.string().min(8).max(72).regex(/[A-Z]/, "Une majuscule est requise.").regex(/[0-9]/, "Un chiffre est requis.");
export const registerSchema = z.object({ body: z.object({ email: z.email(), password, firstName: z.string().min(2).max(60), lastName: z.string().min(2).max(60), phone: z.string().max(30).optional() }) });
export const loginSchema = z.object({ body: z.object({ email: z.email(), password: z.string().min(1) }) });
export const refreshSchema = z.object({ body: z.object({ refreshToken: z.string().min(1) }) });

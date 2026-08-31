// app/src/validators/auth.validator.ts
import { z } from "zod";

/**
 * Esquema de validación para el registro de un nuevo usuario.
 * POST /api/v1/auth/register
 *
 * El registro es global (cualquiera puede registrarse sin autenticación).
 * El rol es opcional en la petición: si no se envía, por defecto se
 * asigna el rol "manager" (Gestor de Solicitudes).
 */
export const registerSchema = z.object({
  name: z
    .string({ error: "name es obligatorio y debe ser texto" })
    .trim()
    .min(2, "name debe tener al menos 2 caracteres")
    .max(100, "name no puede superar los 100 caracteres"),
  email: z
    .string({ error: "email es obligatorio y debe ser texto" })
    .trim()
    .toLowerCase()
    .email("email no tiene un formato válido"),
  password: z
    .string({ error: "password es obligatorio y debe ser texto" })
    .min(8, "password debe tener al menos 8 caracteres")
    .max(72, "password no puede superar los 72 caracteres"),
  role: z.enum(["admin", "manager"]).optional(),
});

/**
 * Esquema de validación para el inicio de sesión.
 * POST /api/v1/auth/login
 */
export const loginSchema = z.object({
  email: z
    .string({ error: "email es obligatorio y debe ser texto" })
    .trim()
    .toLowerCase()
    .email("email no tiene un formato válido"),
  password: z
    .string({ error: "password es obligatorio y debe ser texto" })
    .min(1, "password es obligatorio"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

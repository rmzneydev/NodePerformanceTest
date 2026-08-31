// app/src/routes/auth.routes.ts
import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "../validators/auth.validator";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Registro de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, example: "Juan Perez" }
 *               email: { type: string, example: "juan@example.com" }
 *               password: { type: string, example: "Password123" }
 *               role: { type: string, enum: [admin, manager], example: "manager", description: "Opcional. Por defecto es manager (Gestor)" }
 *     responses:
 *       201: { description: Usuario registrado }
 *       400: { description: Validación fallida }
 *       409: { description: Email ya registrado }
 */
router.post("/register", validate(registerSchema), register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "juan@example.com" }
 *               password: { type: string, example: "Password123" }
 *     responses:
 *       200: { description: Login exitoso }
 *       401: { description: Credenciales inválidas }
 */
router.post("/login", validate(loginSchema), login);

export default router;

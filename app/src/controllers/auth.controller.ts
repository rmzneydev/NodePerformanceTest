// app/src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { sendSuccess } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  sendSuccess(res, result, { statusCode: 201, message: "Usuario registrado" });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  sendSuccess(res, result, { message: "Login exitoso" });
});

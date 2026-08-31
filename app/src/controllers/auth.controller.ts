// app/src/controllers/auth.controller.ts

import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { sendSuccess } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";

/**
 * Handles user registration requests.
 *
 * Delegates the registration process to the authentication service
 * and returns the created user data with a 201 Created status.
 *
 * @param req - Express request containing the user registration data.
 * @param res - Express response used to return the registration result.
 */
export const register = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await authService.register(req.body);

    sendSuccess(res, result, {
      statusCode: 201,
      message: "Usuario registrado",
    });
  }
);

/**
 * Handles user login requests.
 *
 * Delegates the authentication process to the authentication service
 * and returns the login result to the client.
 *
 * @param req - Express request containing the user's login credentials.
 * @param res - Express response used to return the authentication result.
 */
export const login = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await authService.login(req.body);

    sendSuccess(res, result, {
      message: "Login exitoso",
    });
  }
);

// app/src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/AppError";

/**
 * Express middleware responsible for handling application errors.
 *
 * Custom application errors are returned using their associated HTTP
 * status code and optional field-level error details. Unexpected errors
 * are logged and returned as a generic 500 Internal Server Error.
 *
 * @param err - Error thrown during request processing.
 * @param _req - Express request object.
 * @param res - Express response object used to send the error response.
 * @param _next - Express next middleware function.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  /**
   * Handles known application errors with their configured
   * HTTP status code and error details.
   */
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.error, // Omitted from JSON when undefined.
    });

    return;
  }

  /**
   * Logs unexpected errors for debugging and server-side monitoring.
   */
  console.error(err.message, err.stack);

  /**
   * Returns a generic error message in production to avoid
   * exposing internal error details.
   */
  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
}

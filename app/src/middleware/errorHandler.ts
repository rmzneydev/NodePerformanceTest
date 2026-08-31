// app/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/AppError";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.error, // si es undefined, no aparece en el JSON
    });
    return;
  }

  console.error(err.message, err.stack);

  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
}

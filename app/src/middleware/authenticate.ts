// app/src/middleware/authenticate.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { UnauthorizedError } from "../error/AppError";

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Token no proporcionado"));
  }
  const token = header.split(" ")[1];
  if (!token) {
    return next(new UnauthorizedError("Token no proporcionado"));
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    next(new UnauthorizedError("Token inválido o expirado"));
  }
}

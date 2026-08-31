// app/src/middleware/authorize.ts
import { Request, Response, NextFunction } from "express";
import { ForbiddenError, UnauthorizedError } from "../error/AppError";

export function authorize(...allowedRoles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError("No autenticado"));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError("No tienes permisos para esta acción"));
    }
    next();
  };
}

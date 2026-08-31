// app/src/middleware/validate.ts
import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { BadRequestError, FieldError } from "../error/AppError";

/**
 * Middleware que valida `req.body` contra un esquema de Zod.
 *
 * Si la validación falla, lanza {@link BadRequestError} (HTTP 400) con el
 * primer error encontrado (en `error`). Si tiene éxito, reemplaza `req.body`
 * por los datos ya parseados y tipados.
 *
 * @param schema - Esquema de Zod que describe la forma esperada del body.
 *
 * @example
 * router.post("/register", validate(registerSchema), register);
 */
export const validate =
  (schema: ZodType) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      // Solo el primer error: el frontend corrige un campo a la vez.
      const issue = result.error.issues[0];
      const Error: FieldError = {
        field: issue.path.join(".") || "body",
        message: issue.message,
      };
      throw new BadRequestError("Datos inválidos", Error);
    }
    req.body = result.data;
    next();
  };

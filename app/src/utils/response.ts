// app/src/utils/response.ts
import { Response } from "express";

/**
 * Opciones de configuración para las respuestas de éxito.
 */
interface SuccessOptions {
  /**
   * Código de estado HTTP para la respuesta.
   * @default 200
   */
  statusCode?: number;
  /**
   * Mensaje descriptivo opcional para acompañar la respuesta.
   */
  message?: string;
}

/**
 * Envía una respuesta HTTP estandarizada de éxito (JSON).
 *
 * @param res - Objeto de respuesta de Express.
 * @param data - Los datos que se devolverán en la propiedad `data` del cuerpo de la respuesta.
 * @param options - Configuración adicional como `statusCode` y `message`.
 * 
 * @example
 * // Respuesta exitosa básica (200 OK)
 * sendSuccess(res, { id: 1, name: "Alice" });
 * 
 * @example
 * // Respuesta con mensaje y código 201 Created
 * sendSuccess(res, newUser, { statusCode: 201, message: "Usuario creado con éxito" });
 */
export function sendSuccess(
  res: Response,
  data: unknown,
  options: SuccessOptions = {}
): void {
  const { statusCode = 200, message } = options;
  const body: Record<string, unknown> = {
    success: true,
    data,
  };
  if (message) body.message = message;
  res.status(statusCode).json(body);
}
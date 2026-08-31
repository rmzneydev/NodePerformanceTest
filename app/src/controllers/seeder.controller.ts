// app/src/controllers/seeder.controller.ts
import { Request, Response } from "express";
import { seederService } from "../services/seeder.service";
import { sendSuccess } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";
import { BadRequestError } from "../error/AppError";

/**
 * Endpoint que recibe un archivo JSON (campo "file") y puebla la base de datos.
 * El archivo es parseado y enviado al servicio de seeding.
 */
export const uploadSeed = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new BadRequestError("Debe adjuntarse un archivo JSON en el campo 'file'");
  }

  let payload: unknown;
  try {
    payload = JSON.parse(req.file.buffer.toString("utf-8"));
  } catch {
    throw new BadRequestError("El archivo cargado no es un JSON válido");
  }

  const result = await seederService.seed(payload as never);
  sendSuccess(res, result, { statusCode: 201, message: "Seeding completado" });
});
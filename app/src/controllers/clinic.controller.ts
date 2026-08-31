// app/src/controllers/clinic.controller.ts
import { Request, Response } from "express";
import { clinicService } from "../services/clinic.service";
import { sendSuccess } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";

export const createClinic = asyncHandler(async (req: Request, res: Response) => {
  const clinic = await clinicService.create(req.body);
  sendSuccess(res, clinic, { statusCode: 201, message: "Clínica creada" });
});

export const listClinics = asyncHandler(async (_req: Request, res: Response) => {
  const { data, message } = await clinicService.list();
  sendSuccess(res, data, { message });
});

export const getClinicById = asyncHandler(async (req: Request, res: Response) => {
  const clinic = await clinicService.getById(Number(req.params.id));
  sendSuccess(res, clinic);
});

export const updateClinic = asyncHandler(async (req: Request, res: Response) => {
  const clinic = await clinicService.update(Number(req.params.id), req.body);
  sendSuccess(res, clinic, { message: "Clínica actualizada" });
});

export const deleteClinic = asyncHandler(async (req: Request, res: Response) => {
  await clinicService.remove(Number(req.params.id));
  sendSuccess(res, null, { message: "Clínica eliminada" });
});
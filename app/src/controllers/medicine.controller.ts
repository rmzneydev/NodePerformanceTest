// app/src/controllers/medicine.controller.ts
import { Request, Response } from "express";
import { medicineService } from "../services/medicine.service";
import { sendSuccess } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";

export const createMedicine = asyncHandler(async (req: Request, res: Response) => {
  const medicine = await medicineService.create(req.body);
  sendSuccess(res, medicine, { statusCode: 201, message: "Medicamento creado" });
});

export const listMedicines = asyncHandler(async (_req: Request, res: Response) => {
  const medicines = await medicineService.list();
  sendSuccess(res, medicines);
});

export const getMedicineById = asyncHandler(async (req: Request, res: Response) => {
  const medicine = await medicineService.getById(Number(req.params.id));
  sendSuccess(res, medicine);
});

export const updateMedicine = asyncHandler(async (req: Request, res: Response) => {
  const medicine = await medicineService.update(Number(req.params.id), req.body);
  sendSuccess(res, medicine, { message: "Medicamento actualizado" });
});

export const deleteMedicine = asyncHandler(async (req: Request, res: Response) => {
  await medicineService.remove(Number(req.params.id));
  sendSuccess(res, null, { message: "Medicamento eliminado" });
});
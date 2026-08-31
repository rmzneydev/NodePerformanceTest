// app/src/controllers/warehouse.controller.ts
import { Request, Response } from "express";
import { warehouseService } from "../services/warehouse.service";
import { sendSuccess } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";

export const createWarehouse = asyncHandler(async (req: Request, res: Response) => {
  const warehouse = await warehouseService.create(req.body);
  sendSuccess(res, warehouse, { statusCode: 201, message: "Almacén creado" });
});

export const listWarehouses = asyncHandler(async (_req: Request, res: Response) => {
  const warehouses = await warehouseService.list();
  sendSuccess(res, warehouses);
});

export const getWarehouseById = asyncHandler(async (req: Request, res: Response) => {
  const warehouse = await warehouseService.getById(Number(req.params.id));
  sendSuccess(res, warehouse);
});

export const updateWarehouse = asyncHandler(async (req: Request, res: Response) => {
  const warehouse = await warehouseService.update(Number(req.params.id), req.body);
  sendSuccess(res, warehouse, { message: "Almacén actualizado" });
});

export const deleteWarehouse = asyncHandler(async (req: Request, res: Response) => {
  await warehouseService.remove(Number(req.params.id));
  sendSuccess(res, null, { message: "Almacén eliminado" });
});
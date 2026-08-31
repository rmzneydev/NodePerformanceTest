// app/src/controllers/inventory.controller.ts
import { Request, Response } from "express";
import { inventoryService } from "../services/inventory.service";
import { sendSuccess } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";

export const createInventory = asyncHandler(async (req: Request, res: Response) => {
  const inventory = await inventoryService.create(req.body);
  sendSuccess(res, inventory, { statusCode: 201, message: "Inventario creado" });
});

export const listInventory = asyncHandler(async (_req: Request, res: Response) => {
  const inventory = await inventoryService.list();
  sendSuccess(res, inventory);
});

export const getInventoryById = asyncHandler(async (req: Request, res: Response) => {
  const inventory = await inventoryService.getById(Number(req.params.id));
  sendSuccess(res, inventory);
});

export const updateInventory = asyncHandler(async (req: Request, res: Response) => {
  const inventory = await inventoryService.update(Number(req.params.id), req.body);
  sendSuccess(res, inventory, { message: "Inventario actualizado" });
});

export const deleteInventory = asyncHandler(async (req: Request, res: Response) => {
  await inventoryService.remove(Number(req.params.id));
  sendSuccess(res, null, { message: "Inventario eliminado" });
});
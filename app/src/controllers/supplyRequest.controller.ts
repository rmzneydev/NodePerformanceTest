// app/src/controllers/supplyRequest.controller.ts
import { Request, Response } from "express";
import { supplyRequestService } from "../services/supplyRequest.service";
import { sendSuccess } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";

export const createRequest = asyncHandler(async (req: Request, res: Response) => {
  const request = await supplyRequestService.create(req.body);
  sendSuccess(res, request, { statusCode: 201, message: "Solicitud creada" });
});

export const listRequests = asyncHandler(async (_req: Request, res: Response) => {
  const requests = await supplyRequestService.list();
  sendSuccess(res, requests);
});

export const listActiveRequests = asyncHandler(async (_req: Request, res: Response) => {
  const requests = await supplyRequestService.listActive();
  sendSuccess(res, requests);
});

export const listRequestsByClinic = asyncHandler(async (req: Request, res: Response) => {
  const requests = await supplyRequestService.listByClinic(Number(req.params.clinicId));
  sendSuccess(res, requests);
});

export const getRequestById = asyncHandler(async (req: Request, res: Response) => {
  const request = await supplyRequestService.getById(Number(req.params.id));
  sendSuccess(res, request);
});

export const updateRequest = asyncHandler(async (req: Request, res: Response) => {
  const request = await supplyRequestService.update(Number(req.params.id), req.body);
  sendSuccess(res, request, { message: "Solicitud actualizada" });
});

export const changeRequestStatus = asyncHandler(async (req: Request, res: Response) => {
  const request = await supplyRequestService.changeStatus(Number(req.params.id), req.body);
  sendSuccess(res, request, { message: "Estado actualizado" });
});

export const deleteRequest = asyncHandler(async (req: Request, res: Response) => {
  await supplyRequestService.remove(Number(req.params.id));
  sendSuccess(res, null, { message: "Solicitud eliminada" });
});
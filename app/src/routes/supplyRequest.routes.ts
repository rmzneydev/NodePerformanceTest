// app/src/routes/supplyRequest.routes.ts
import { Router } from "express";
import {
  createRequest,
  listRequests,
  listActiveRequests,
  listRequestsByClinic,
  getRequestById,
  updateRequest,
  changeRequestStatus,
  deleteRequest,
} from "../controllers/supplyRequest.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: SupplyRequests
 *   description: Solicitudes de abastecimiento
   */

/**
 * @swagger
 * /api/v1/requests:
 *   post:
 *     summary: Crear solicitud de abastecimiento (gestor/admin)
 *     tags: [SupplyRequests]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [clinicId, warehouseId, medicineId, quantity]
 *             properties:
 *               clinicId: { type: integer, example: 1 }
 *               warehouseId: { type: integer, example: 1 }
 *               medicineId: { type: integer, example: 1 }
 *               quantity: { type: integer, example: 25 }
 *     responses:
 *       201: { description: Solicitud creada }
 *       400: { description: Inventario insuficiente }
 */
router.post("/", authenticate, authorize("admin", "manager"), createRequest);

/**
 * @swagger
 * /api/v1/requests/history:
 *   get:
 *     summary: Historial completo de solicitudes (todos los autenticados)
 *     tags: [SupplyRequests]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de solicitudes }
 */
router.get("/history", authenticate, listRequests);

/**
 * @swagger
 * /api/v1/requests/active:
 *   get:
 *     summary: Solicitudes activas (todos los autenticados)
 *     tags: [SupplyRequests]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de solicitudes activas }
 */
router.get("/active", authenticate, listActiveRequests);

/**
 * @swagger
 * /api/v1/requests/clinic/{clinicId}:
 *   get:
 *     summary: Historial de solicitudes por clínica (todos los autenticados)
 *     tags: [SupplyRequests]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: clinicId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Lista de solicitudes de la clínica }
 */
router.get("/clinic/:clinicId", authenticate, listRequestsByClinic);

/**
 * @swagger
 * /api/v1/requests/{id}:
 *   get:
 *     summary: Obtener solicitud por id
 *     tags: [SupplyRequests]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Solicitud }
 *       404: { description: No encontrada }
 */
router.get("/:id", authenticate, getRequestById);

/**
 * @swagger
 * /api/v1/requests/{id}/status:
 *   patch:
 *     summary: Actualizar estado de una solicitud (gestor/admin)
 *     tags: [SupplyRequests]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [PENDING, APPROVED, REJECTED, DISPATCHED, DELIVERED, CANCELLED], example: "APPROVED" }
 *     responses:
 *       200: { description: Estado actualizado }
 *       400: { description: Transición no permitida }
 */
router.patch("/:id/status", authenticate, authorize("admin", "manager"), changeRequestStatus);

/**
 * @swagger
 * /api/v1/requests/{id}:
 *   put:
 *     summary: Actualizar solicitud (admin)
 *     tags: [SupplyRequests]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clinicId: { type: integer }
 *               warehouseId: { type: integer }
 *               medicineId: { type: integer }
 *               quantity: { type: integer }
 *     responses:
 *       200: { description: Solicitud actualizada }
 */
router.put("/:id", authenticate, authorize("admin"), updateRequest);

/**
 * @swagger
 * /api/v1/requests/{id}:
 *   delete:
 *     summary: Eliminar solicitud (lógico, admin)
 *     tags: [SupplyRequests]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Solicitud eliminada }
 */
router.delete("/:id", authenticate, authorize("admin"), deleteRequest);

export default router;
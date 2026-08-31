// app/src/routes/clinic.routes.ts
import { Router } from "express";
import { createClinic, listClinics, getClinicById, updateClinic, deleteClinic } from "../controllers/clinic.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clinics
 *   description: Clínicas (solo administradores)
   */

/**
 * @swagger
 * /api/v1/clinics:
 *   post:
 *     summary: Crear clínica
 *     tags: [Clinics]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, nit, responsibleUserId]
 *             properties:
 *               name: { type: string, example: "Clínica Central" }
 *               nit: { type: string, example: "900123456" }
 *               address: { type: string, example: "Cra 10 #20-30" }
 *               phone: { type: string, example: "3101234567" }
 *               responsibleUserId: { type: integer, example: 1 }
 *     responses:
 *       201: { description: Clínica creada }
 *       409: { description: NIT duplicado }
 */
router.post("/", authenticate, authorize("admin"), createClinic);

/**
 * @swagger
 * /api/v1/clinics:
 *   get:
 *     summary: Listar clínicas
 *     tags: [Clinics]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de clínicas }
 */
router.get("/", authenticate, authorize("admin"), listClinics);

/**
 * @swagger
 * /api/v1/clinics/{id}:
 *   get:
 *     summary: Obtener clínica por id
 *     tags: [Clinics]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Clínica }
 *       404: { description: No encontrada }
 */
router.get("/:id", authenticate, authorize("admin"), getClinicById);

/**
 * @swagger
 * /api/v1/clinics/{id}:
 *   put:
 *     summary: Actualizar clínica
 *     tags: [Clinics]
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
 *               name: { type: string }
 *               nit: { type: string }
 *               address: { type: string }
 *               phone: { type: string }
 *               responsibleUserId: { type: integer }
 *     responses:
 *       200: { description: Clínica actualizada }
 */
router.put("/:id", authenticate, authorize("admin"), updateClinic);

/**
 * @swagger
 * /api/v1/clinics/{id}:
 *   delete:
 *     summary: Eliminar clínica (lógico)
 *     tags: [Clinics]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Clínica eliminada }
 */
router.delete("/:id", authenticate, authorize("admin"), deleteClinic);

export default router;
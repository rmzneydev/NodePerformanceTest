// app/src/routes/medicine.routes.ts
import { Router } from "express";
import { createMedicine, listMedicines, getMedicineById, updateMedicine, deleteMedicine } from "../controllers/medicine.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Medicines
 *   description: Medicamentos (solo administradores)
   */

/**
 * @swagger
 * /api/v1/medicines:
 *   post:
 *     summary: Crear medicamento
 *     tags: [Medicines]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, code]
 *             properties:
 *               name: { type: string, example: "Acetaminofén" }
 *               code: { type: string, example: "MED-001" }
 *               description: { type: string, example: "Analgésico" }
 *               manufacturer: { type: string, example: "Genfar" }
 *     responses:
 *       201: { description: Medicamento creado }
 *       409: { description: Código duplicado }
 */
router.post("/", authenticate, authorize("admin"),  createMedicine);

/**
 * @swagger
 * /api/v1/medicines:
 *   get:
 *     summary: Listar medicamentos
 *     tags: [Medicines]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de medicamentos }
 */
router.get("/", authenticate, authorize("admin"), listMedicines);

/**
 * @swagger
 * /api/v1/medicines/{id}:
 *   get:
 *     summary: Obtener medicamento por id
 *     tags: [Medicines]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Medicamento }
 *       404: { description: No encontrado }
 */
router.get("/:id", authenticate, authorize("admin"), getMedicineById);

/**
 * @swagger
 * /api/v1/medicines/{id}:
 *   put:
 *     summary: Actualizar medicamento
 *     tags: [Medicines]
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
 *               code: { type: string }
 *               description: { type: string }
 *               manufacturer: { type: string }
 *     responses:
 *       200: { description: Medicamento actualizado }
 */
router.put("/:id", authenticate, authorize("admin"), updateMedicine);

/**
 * @swagger
 * /api/v1/medicines/{id}:
 *   delete:
 *     summary: Eliminar medicamento (lógico)
 *     tags: [Medicines]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Medicamento eliminado }
 */
router.delete("/:id", authenticate, authorize("admin"), deleteMedicine);

export default router;
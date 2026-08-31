// app/src/routes/warehouse.routes.ts
import { Router } from "express";
import { createWarehouse, listWarehouses, getWarehouseById, updateWarehouse, deleteWarehouse } from "../controllers/warehouse.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Warehouses
 *   description: Almacenes (solo administradores)
   */

/**
 * @swagger
 * /api/v1/warehouses:
 *   post:
 *     summary: Crear almacén
 *     tags: [Warehouses]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, location]
 *             properties:
 *               name: { type: string, example: "Bodega Norte" }
 *               location: { type: string, example: "Medellín" }
 *               address: { type: string, example: "Calle 50 #10" }
 *     responses:
 *       201: { description: Almacén creado }
 */
router.post("/", authenticate, authorize("admin"), createWarehouse);

/**
 * @swagger
 * /api/v1/warehouses:
 *   get:
 *     summary: Listar almacenes
 *     tags: [Warehouses]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de almacenes }
 */
router.get("/", authenticate, authorize("admin"), listWarehouses);

/**
 * @swagger
 * /api/v1/warehouses/{id}:
 *   get:
 *     summary: Obtener almacén por id
 *     tags: [Warehouses]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Almacén }
 *       404: { description: No encontrado }
 */
router.get("/:id", authenticate, authorize("admin"), getWarehouseById);

/**
 * @swagger
 * /api/v1/warehouses/{id}:
 *   put:
 *     summary: Actualizar almacén
 *     tags: [Warehouses]
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
 *               location: { type: string }
 *               address: { type: string }
 *     responses:
 *       200: { description: Almacén actualizado }
 */
router.put("/:id", authenticate, authorize("admin"), updateWarehouse);

/**
 * @swagger
 * /api/v1/warehouses/{id}:
 *   delete:
 *     summary: Eliminar almacén (lógico)
 *     tags: [Warehouses]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Almacén eliminado }
 */
router.delete("/:id", authenticate, authorize("admin"), deleteWarehouse);

export default router;
// app/src/routes/inventory.routes.ts
import { Router } from "express";
import { createInventory, listInventory, getInventoryById, updateInventory, deleteInventory } from "../controllers/inventory.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventario (solo administradores)
   */

/**
 * @swagger
 * /api/v1/inventory:
 *   post:
 *     summary: Crear inventario (stock)
 *     tags: [Inventory]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [warehouseId, medicineId, stock]
 *             properties:
 *               warehouseId: { type: integer, example: 1 }
 *               medicineId: { type: integer, example: 1 }
 *               stock: { type: integer, example: 100 }
 *     responses:
 *       201: { description: Inventario creado }
 *       409: { description: Ya existe para ese almacén y medicamento }
 */
router.post("/", authenticate, authorize("admin"), createInventory);

/**
 * @swagger
 * /api/v1/inventory:
 *   get:
 *     summary: Listar inventario
 *     tags: [Inventory]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de inventario }
 */
router.get("/", authenticate, authorize("admin"), listInventory);

/**
 * @swagger
 * /api/v1/inventory/{id}:
 *   get:
 *     summary: Obtener inventario por id
 *     tags: [Inventory]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Inventario }
 *       404: { description: No encontrado }
 */
router.get("/:id", authenticate, authorize("admin"), getInventoryById);

/**
 * @swagger
 * /api/v1/inventory/{id}:
 *   put:
 *     summary: Actualizar stock
 *     tags: [Inventory]
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
 *             required: [stock]
 *             properties:
 *               stock: { type: integer, example: 150 }
 *     responses:
 *       200: { description: Inventario actualizado }
 */
router.put("/:id", authenticate, authorize("admin"), updateInventory);

/**
 * @swagger
 * /api/v1/inventory/{id}:
 *   delete:
 *     summary: Eliminar inventario (lógico)
 *     tags: [Inventory]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Inventario eliminado }
 */
router.delete("/:id", authenticate, authorize("admin"), deleteInventory);

export default router;
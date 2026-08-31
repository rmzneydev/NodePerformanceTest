// app/src/routes/seeder.routes.ts
import { Router } from "express";
import { uploadSeed } from "../controllers/seeder.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { uploadSeedFile } from "../utils/multer";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Seed
 *   description: Carga de seeders por archivo JSON (solo administradores)
 */

/**
 * @swagger
 * /api/v1/seed/upload:
 *   post:
 *     summary: Cargar seeders desde un archivo JSON
 *     tags: [Seed]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: |
 *                   Archivo JSON con usuarios, clínicas, almacenes y/o medicamentos.
 *                   Todas las secciones son opcionales; solo se procesan las presentes.
 *                   El seeding es idempotente (no duplica registros existentes).
 *
 *                   **Estructura esperada del archivo JSON:**
 *
 *                   ```json
 *                   {
 *                     "users": [
 *                       { "name": "Admin", "email": "admin@example.com", "password": "Admin1234", "role": "admin", "isActive": true },
 *                       { "name": "Gestor Ejemplo", "email": "gestor@example.com", "password": "Gestor1234", "role": "manager", "isActive": true }
 *                     ],
 *                     "clinics": [
 *                       { "name": "Clínica Central", "nit": "900123456-1", "address": "Calle 50 #45-12", "phone": "3101234567", "responsibleUserId": 1 },
 *                       { "name": "Clínica del Norte", "nit": "900234567-2", "address": "Carrera 20 #80-30", "phone": "3202345678" }
 *                     ],
 *                     "warehouses": [
 *                       { "name": "Bodega Norte", "location": "Medellín", "address": "Calle 50 #10" },
 *                       { "name": "Bodega Sur", "location": "Cali", "address": "Carrera 30 #20" }
 *                     ],
 *                     "medicines": [
 *                       { "name": "Acetaminofén", "code": "MED-001", "description": "Analgésico", "manufacturer": "Genfar" },
 *                       { "name": "Ibuprofeno", "code": "MED-002", "description": "Antiinflamatorio", "manufacturer": "Procaps" }
 *                     ]
 *                   }
 *                   ```
 *
 *                   Notas:
 *                   - `nit` de clínica y `code` de medicamento son únicos (se omiten duplicados).
 *                   - `responsibleUserId` es opcional; si no se envía se asigna el primer usuario con rol `manager`.
 *                   - `role` admite `admin` o `manager` (por defecto `manager`).
 *     responses:
 *       201:
 *         description: Seeding completado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Seeding completado"
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: integer
 *                       example: 2
 *                     clinics:
 *                       type: integer
 *                       example: 2
 *                     warehouses:
 *                       type: integer
 *                       example: 2
 *                     medicines:
 *                       type: integer
 *                       example: 2
 *                     created:
 *                       type: integer
 *                       example: 8
 *                     skipped:
 *                       type: integer
 *                       example: 0
 *       400:
 *         description: Archivo inválido, no es JSON o falta el campo 'file'
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Solo administradores
 */
router.post("/upload", uploadSeedFile, uploadSeed);

export default router;

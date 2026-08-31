// app/src/routes/index.ts
import { Router } from "express";
import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import clinicRoutes from "./clinic.routes";
import warehouseRoutes from "./warehouse.routes";
import medicineRoutes from "./medicine.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);

router.use("/clinics", clinicRoutes);
router.use("/warehouses", warehouseRoutes);
router.use("/medicines", medicineRoutes);


export default router;

// app/src/routes/health.routes.ts
import { Router, Request, Response } from "express";
import sequelize from "../config/database";

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", async (_req: Request, res: Response) => {
  let db = "disconnected";
  try {
    await sequelize.authenticate();
    db = "connected";
  } catch {
    db = "disconnected";
  }
  res.json({
    success: true,
    data: {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      db,
    },
  });
});

export default router;

import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./docs/swagger";
import { corsOptions } from "./config/cors";

/**
 * Express application instance.
 *
 * Configures middleware for CORS, JSON and URL-encoded request bodies,
 * and exposes the interactive Swagger API documentation.
 */
const app = express();

/**
 * Enable Cross-Origin Resource Sharing (CORS) using the configured options.
 */
app.use(cors(corsOptions));

/**
 * Parse incoming requests with JSON payloads.
 */
app.use(express.json());

/**
 * Parse incoming requests with URL-encoded payloads.
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Serve the interactive Swagger API documentation.
 *
 * The documentation is available at `/api/docs`.
 */
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;

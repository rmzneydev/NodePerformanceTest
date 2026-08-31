import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { corsOptions } from "./config/cors";
import cors from "cors";
import routes from "./routes";
import healthRoutes from "./routes/health.routes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

/**
 * Express application instance.
 *
 * Configures middleware, health check routes, API routes,
 * Swagger documentation, and centralized error handling.
 */
const app = express();

/**
 * Enables Cross-Origin Resource Sharing (CORS) using the
 * application's configured CORS options.
 */
app.use(cors(corsOptions));

/**
 * Parses incoming requests with JSON payloads.
 */
app.use(express.json());

/**
 * Parses incoming requests with URL-encoded payloads.
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Registers the health check endpoint without an API prefix.
 *
 * This endpoint is intended to be used by Docker health checks
 * and other infrastructure monitoring tools.
 */
app.use("/health", healthRoutes);

/**
 * Registers the versioned API routes.
 *
 * All application API endpoints are exposed under `/api/v1`.
 */
app.use("/api/v1", routes);

/**
 * Serves the Swagger API documentation.
 *
 * The documentation is available at `/api/docs`.
 */
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

/**
 * Handles requests that do not match any registered route.
 */
app.use(notFound);

/**
 * Handles application errors through the centralized error handler.
 */
app.use(errorHandler);

export default app;

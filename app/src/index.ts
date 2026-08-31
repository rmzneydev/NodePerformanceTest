// app/src/index.ts

/**
 * Application entry point.
 *
 * Loads environment variables before importing modules that depend on
 * `process.env`, initializes the database connection, synchronizes the
 * database schema, and starts the Express server.
 */

// Load environment variables before any import that reads from `process.env`.
import "dotenv/config";

import app from "./server";
import sequelize from "./config/database";
import { runAutoSeed } from "./seeders/auto-seed";

const PORT = process.env.APP_PORT || 3000;

/**
 * Initializes the application and starts the HTTP server.
 *
 * The startup process includes:
 * - Authenticating the database connection.
 * - Synchronizing the database schema.
 * - Starting the Express server.
 *
 * If the database connection or synchronization fails, the process exits
 * with a non-zero status code.
 */
const start = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Synchronize the database schema.
    // `alter: true` updates existing tables to match the current models.
    // For production environments, database migrations should be used instead.
    await sequelize.sync({ alter: true });
    console.log("Database synchronization completed (alter: true).");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}.`);
      console.log(`API documentation: http://localhost:${PORT}/api/docs`);
      console.log(`Health check: http://localhost:${PORT}/health`);

      // Ejecuta el seeder automático una vez el servidor está listo para
      // aceptar peticiones (no bloquea el arranque ni tira el proceso si falla).
      void runAutoSeed();
    });
  } catch (error) {
    console.error("Failed to connect to the database.", error);
    process.exit(1);
  }
};

start();

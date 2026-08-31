// app/src/config/database.ts

import { Sequelize } from "sequelize";

/**
 * Sequelize instance configured to connect to the PostgreSQL database.
 *
 * Database credentials and connection settings are loaded from environment
 * variables. The default host is "db", which matches the PostgreSQL service
 * name defined in Docker Compose.
 */
const sequelize = new Sequelize(
  process.env.POSTGRES_DB as string,
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PASSWORD as string,
  {
    // In Docker Compose, the database service is named "db".
    host: process.env.POSTGRES_HOST || "db",

    port: parseInt(process.env.POSTGRES_PORT || "5432", 10),

    dialect: "postgres",

    // Disable SQL query logging to keep the console output clean,
    // especially in production environments.
    logging: false,
  }
);

export default sequelize;

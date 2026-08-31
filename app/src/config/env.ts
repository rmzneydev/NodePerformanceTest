// app/src/config/env.ts

import dotenv from "dotenv";

/**
 * Loads environment variables from the `.env` file into `process.env`.
 */
dotenv.config();

/**
 * Retrieves a required environment variable.
 *
 * If the environment variable is not defined and no default value
 * is provided, an error is thrown.
 *
 * @param key - Name of the environment variable.
 * @param defaultValue - Optional fallback value.
 * @returns The environment variable value or the provided default value.
 * @throws {Error} If the variable is missing or empty and no default value is provided.
 */
function requireEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;

  if (value === undefined || value === "") {
    throw new Error(`Missing required env var: ${key}`);
  }

  return value;
}

/**
 * Retrieves an optional environment variable.
 *
 * If the environment variable is not defined, the provided default value
 * is returned instead.
 *
 * @param key - Name of the environment variable.
 * @param defaultValue - Value to use when the environment variable is not defined.
 * @returns The environment variable value or the provided default value.
 */
function optionalEnv(key: string, defaultValue: string): string {
  return process.env[key] ?? defaultValue;
}

/**
 * Application environment configuration.
 *
 * Contains server, API, CORS, database, authentication, and security
 * configuration values loaded from environment variables.
 */
export const env = {
  /** Current application environment. */
  NODE_ENV: optionalEnv("NODE_ENV", "development"),

  /** Port on which the application server listens. */
  APP_PORT: parseInt(optionalEnv("APP_PORT", "3000"), 10),

  /** Base prefix used for versioned API routes. */
  API_PREFIX: optionalEnv("API_PREFIX", "/api/v1"),

  /** Allowed origins for Cross-Origin Resource Sharing (CORS). */
  CORS_ORIGINS: optionalEnv("CORS_ORIGINS", "http://localhost:3000"),

  /** PostgreSQL database name. */
  POSTGRES_DB: requireEnv("POSTGRES_DB"),

  /** PostgreSQL database username. */
  POSTGRES_USER: requireEnv("POSTGRES_USER"),

  /** PostgreSQL database password. */
  POSTGRES_PASSWORD: requireEnv("POSTGRES_PASSWORD"),

  /** PostgreSQL database host. */
  POSTGRES_HOST: optionalEnv("POSTGRES_HOST", "db"),

  /** PostgreSQL database port. */
  POSTGRES_PORT: parseInt(optionalEnv("POSTGRES_PORT", "5432"), 10),

  /** Optional database connection URL. */
  DATABASE_URL: process.env.DATABASE_URL || "",

  /** Secret key used to sign and verify JSON Web Tokens. */
  JWT_SECRET: requireEnv("JWT_SECRET"),

  /** JWT expiration time. Defaults to one day. */
  JWT_EXPIRES_IN: optionalEnv("JWT_EXPIRES_IN", "1d"),

  /** Number of bcrypt salt rounds used for password hashing. */
  BCRYPT_SALT_ROUNDS: parseInt(
    optionalEnv("BCRYPT_SALT_ROUNDS", "10"),
    10
  ),
};

/**
 * Warns when the JWT secret is shorter than the recommended
 * minimum length for security.
 */
if (env.JWT_SECRET.length < 32) {
  console.warn("WARN: JWT_SECRET should be at least 32 chars for security");
}
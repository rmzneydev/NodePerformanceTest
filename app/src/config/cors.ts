// app/src/config/cors.ts

import { CorsOptions } from "cors";

/**
 * List of origins allowed to make cross-origin requests to the API.
 *
 * Origins are loaded from the CORS_ORIGINS environment variable and
 * separated by commas.
 */
const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];

/**
 * CORS configuration for the API.
 *
 * Requests without an origin, such as server-to-server requests, are allowed.
 * Requests from configured origins are also allowed.
 * All other origins are rejected.
 */
export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error("Origin not allowed"));
  },

  // Allow cookies and authentication credentials in cross-origin requests.
  credentials: true,
};

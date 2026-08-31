// app/src/docs/swagger.ts

/**
 * Swagger configuration.
 *
 * This file configures automatic API documentation using `swagger-jsdoc`
 * and `swagger-ui-express`.
 *
 * - Generates an OpenAPI 3.0.0 specification.
 * - Extracts API documentation from JSDoc annotations in route and
 *   documentation files.
 *
 * The generated documentation is served through `swagger-ui-express`
 * and is available at `/api/docs` (see `server.ts`).
 */

import swaggerJSDoc from "swagger-jsdoc";

/**
 * Configuration options for `swagger-jsdoc`.
 *
 * `definition`:
 * - Defines the OpenAPI specification version.
 * - Provides basic API information such as title, version, and description.
 * - Configures the available authentication schemes.
 *
 * `apis`:
 * - Specifies the files containing JSDoc annotations used to document
 *   API endpoints and other OpenAPI definitions.
 */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Example",
      version: "1.0.0",
      description:
        "Automatically generated Swagger documentation for the example API.",
    },
    servers: [
      {
        url: `http://localhost:${process.env.APP_PORT || 3000}`,
        description: "Local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  // Paths containing JSDoc annotations used to generate the API documentation.
  apis: ["./src/routes/*.ts", "./src/docs/*.ts"],
};

/**
 * Dynamically generated Swagger/OpenAPI specification.
 *
 * This specification is exported and consumed by `swagger-ui-express`
 * to render the interactive API documentation.
 */
export const swaggerSpec = swaggerJSDoc(options);

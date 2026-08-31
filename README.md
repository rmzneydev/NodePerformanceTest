# NodePerformanceTest

API to manage supply requests for medical clinics and warehouses.

## Use case

This project implements a REST API for RiwiMediCare Plus to manage clinic supply requests, inventory, warehouses and medicines. It replaces ad-hoc email/spreadsheet workflows with a traceable, role-based system.

## Tech stack

- Node.js (>=18)
- TypeScript
- Express
- Sequelize
- PostgreSQL
- JSON Web Tokens (JWT)
- Swagger (JSDoc) for API documentation

## Main features

- User registration and login with roles: `admin` and `manager`.
- Role-based access control and JWT-protected routes.
- CRUD for clinics, warehouses, medicines and supply requests (logical delete).
- Inventory management per warehouse and basic stock validation.
- Supply request workflow with state transitions and endpoint to change status.
- File-based seeding endpoint (`POST /api/v1/seed/upload`) to load initial data from JSON using multipart upload.
- Swagger UI available at `/api/docs`.

## Requirements

- Node.js 18 or higher
- PostgreSQL

## Environment variables

- `APP_PORT` - application port (default `3000`)
- `DATABASE_URL` or DB connection variables used by Sequelize
- `AUTO_SEED` - set to `false` to disable automatic seed on startup (default enabled)
- `SEED_FILE_PATH` - path to seed JSON file (default `seed-data.json`)

## Setup (development)

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables (copy `.env.example` to `.env` and update values).

3. Start the app:

```bash
npm run dev
```

The app synchronizes the database schema on startup (using `sequelize.sync({ alter: true })`). For production use migrations instead.

## Docker

Build and run with Docker (example):

```bash
docker compose up --build
```

This `docker-compose.yml` brings up the API and a PostgreSQL container with a persistent volume.

## Seeding

- There is an upload endpoint `POST /api/v1/seed/upload` that accepts a multipart/form-data file field named `file` with a JSON payload containing sections: `users`, `clinics`, `warehouses`, `medicines`.
- The seed import is idempotent and intended for test data population.
- An auto-seeder runs at startup unless `AUTO_SEED=false`. The auto-seeder posts the configured seed file directly to the upload endpoint.

## Tests

Run unit tests and coverage:

```bash
npm test -- --coverage
```

Minimum required coverage: 40%.

## API documentation

Swagger UI is served at `/api/docs` and documents all endpoints including request/response schemas and examples.

## Notes

- All protected routes require a valid JWT. The registration endpoint is public to create `admin` or `manager` users for testing.
- Deletions are logical (soft delete) to preserve history.
- Use Sequelize models and TypeScript interfaces throughout the codebase.

## Backup

Include a SQL dump of the PostgreSQL database (`.sql`) as part of delivery if required.

---

For implementation details, see the `app/src` folder and the `use.case.md` file for full requirements.
# NodePerformanceTest
// app/src/seeders/auto-seed.ts
import { readFile } from "fs/promises";
import path from "path";

/**
 * Auto-seeder al arranque.
 *
 * Cuando el servidor termina de iniciar, este módulo:
 *  1. Lee el archivo JSON de seed (por defecto `app/seed-data.json`,
 *     configurable con la variable de entorno `SEED_FILE_PATH`).
 *  2. Envía el archivo como multipart al endpoint
 *     `POST /api/v1/seed/upload` sin requerir autenticación.
 *
 * El seeding es idempotente, por lo que es seguro ejecutarlo en cada arranque.
 * Se puede desactivar con la variable de entorno `AUTO_SEED=false`.
 */

const SEED_FILE_PATH = path.resolve(
  process.cwd(),
  process.env.SEED_FILE_PATH || "seed-data.json"
);

const BASE_URL = `http://localhost:${process.env.APP_PORT || 3000}/api/v1`;

interface SeedUploadResult {
  users?: number;
  clinics?: number;
  warehouses?: number;
  medicines?: number;
  created?: number;
  skipped?: number;
}

/** Lee el JSON de seed y lo envía al endpoint de carga. */
async function uploadSeedFile(): Promise<SeedUploadResult> {
  let raw: string;
  try {
    raw = await readFile(SEED_FILE_PATH, "utf-8");
  } catch {
    throw new Error(`No se pudo leer el archivo de seed: ${SEED_FILE_PATH}`);
  }

  // Valida que el contenido sea JSON válido antes de enviarlo.
  JSON.parse(raw);

  const form = new FormData();
  form.append(
    "file",
    new Blob([raw], { type: "application/json" }),
    path.basename(SEED_FILE_PATH)
  );

  const response = await fetch(`${BASE_URL}/seed/upload`, {
    method: "POST",
    body: form,
  });

  const body = (await response.json()) as {
    success: boolean;
    message?: string;
    data?: SeedUploadResult;
  };

  if (!response.ok || !body.success) {
    throw new Error(
      `Carga de seed falló (${response.status}): ${body.message ?? "sin mensaje"}`
    );
  }
  return body.data ?? {};
}

/**
 * Ejecuta el auto-seeding. Registra el resultado en consola sin propagar
 * errores para no afectar el arranque del servidor.
 */
export async function runAutoSeed(): Promise<void> {
  if (process.env.AUTO_SEED === "false") {
    console.log("Auto-seed deshabilitado (AUTO_SEED=false).");
    return;
  }

  try {
    console.log("Auto-seed: iniciando...");
    const result = await uploadSeedFile();
    console.log(
      `Auto-seed completado: ${result.created ?? 0} creado(s), ${
        result.skipped ?? 0
      } omitido(s) | users=${result.users ?? 0}, clinics=${
        result.clinics ?? 0
      }, warehouses=${result.warehouses ?? 0}, medicines=${
        result.medicines ?? 0
      }`
    );
  } catch (error) {
    console.error("Auto-seed falló:", error instanceof Error ? error.message : error);
  }
}

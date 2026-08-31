// app/src/dto/seeder.dto.ts

/**
 * Datos de usuario para el seeder por archivo JSON.
 */
export interface SeedUserDto {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "manager";
  isActive?: boolean;
}

/**
 * Datos de clínica para el seeder por archivo JSON.
 * El `responsibleUserId` es opcional: si no se envía, se asigna un
 * usuario con rol "manager" existente.
 */
export interface SeedClinicDto {
  name: string;
  nit: string;
  address?: string;
  phone?: string;
  responsibleUserId?: number;
  isActive?: boolean;
}

/**
 * Datos de almacén para el seeder por archivo JSON.
 */
export interface SeedWarehouseDto {
  name: string;
  location: string;
  address?: string;
  isActive?: boolean;
}

/**
 * Datos de medicamento para el seeder por archivo JSON.
 */
export interface SeedMedicineDto {
  name: string;
  code: string;
  description?: string;
  manufacturer?: string;
  isActive?: boolean;
}

/**
 * Estructura del archivo JSON que se carga en el endpoint de seeding.
 * Todas las secciones son opcionales; solo se procesan las presentes.
 */
export interface SeedFileDto {
  users?: SeedUserDto[];
  clinics?: SeedClinicDto[];
  warehouses?: SeedWarehouseDto[];
  medicines?: SeedMedicineDto[];
}

/**
 * Resultado resumido del proceso de seeding.
 */
export interface SeedResult {
  users: number;
  clinics: number;
  warehouses: number;
  medicines: number;
  created: number;
  skipped: number;
}
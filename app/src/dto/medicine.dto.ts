// app/src/dto/medicine.dto.ts

/**
 * Datos requeridos para crear un medicamento.
 */
export interface CreateMedicineDto {
  /**
   * Nombre del medicamento.
   */
  name: string;
  /**
   * Código del medicamento (único).
   */
  code: string;
  /**
   * Descripción del medicamento.
   */
  description?: string;
  /**
   * Fabricante del medicamento.
   */
  manufacturer?: string;
}

/**
 * Datos editables de un medicamento (todos opcionales).
 */
export interface UpdateMedicineDto {
  name?: string;
  code?: string;
  description?: string | null;
  manufacturer?: string | null;
}
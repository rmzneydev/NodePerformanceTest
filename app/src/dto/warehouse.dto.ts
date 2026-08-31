// app/src/dto/warehouse.dto.ts

/**
 * Datos requeridos para crear un almacén.
 */
export interface CreateWarehouseDto {
  /**
   * Nombre del almacén.
   */
  name: string;
  /**
   * Ubicación del almacén.
   */
  location: string;
  /**
   * Dirección del almacén.
   */
  address?: string;
}

/**
 * Datos editables de un almacén (todos opcionales).
 */
export interface UpdateWarehouseDto {
  name?: string;
  location?: string;
  address?: string | null;
}
// app/src/dto/inventory.dto.ts

/**
 * Datos requeridos para crear una entrada de inventario.
 */
export interface CreateInventoryDto {
  /**
   * Id del almacén.
   */
  warehouseId: number;
  /**
   * Id del medicamento.
   */
  medicineId: number;
  /**
   * Cantidad de stock del medicamento en ese almacén.
   */
  stock: number;
}

/**
 * Datos editables de una entrada de inventario.
 */
export interface UpdateInventoryDto {
  /**
   * Nueva cantidad de stock.
   */
  stock?: number;
}
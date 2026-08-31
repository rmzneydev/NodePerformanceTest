// app/src/repositories/interfaces/IInventoryRepository.ts
import { CreationAttributes } from "sequelize";
import { Inventory } from "../../models/inventory.model";

/**
 * Contrato de persistencia para inventario.
 */
export interface IInventoryRepository {
  findById(id: number): Promise<Inventory | null>;
  findByWarehouseAndMedicine(warehouseId: number, medicineId: number): Promise<Inventory | null>;
  findAll(): Promise<Inventory[]>;
  create(data: CreationAttributes<Inventory>): Promise<Inventory>;
  update(id: number, data: Partial<CreationAttributes<Inventory>>): Promise<Inventory | null>;
  softDelete(id: number): Promise<boolean>;
}
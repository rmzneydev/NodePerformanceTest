// app/src/repositories/interfaces/IWarehouseRepository.ts
import { CreationAttributes } from "sequelize";
import { Warehouse } from "../../models/warehouse.model";

/**
 * Contrato de persistencia para almacenes.
 */
export interface IWarehouseRepository {
  findById(id: number): Promise<Warehouse | null>;
  findAll(): Promise<Warehouse[]>;
  create(data: CreationAttributes<Warehouse>): Promise<Warehouse>;
  update(id: number, data: Partial<CreationAttributes<Warehouse>>): Promise<Warehouse | null>;
  softDelete(id: number): Promise<boolean>;
}
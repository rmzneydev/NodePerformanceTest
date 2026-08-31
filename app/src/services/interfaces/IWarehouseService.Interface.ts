// app/src/services/interfaces/IWarehouseService.ts
import { CreateWarehouseDto, UpdateWarehouseDto } from "../../dto/warehouse.dto";

/**
 * Contrato de lógica de negocio para almacenes.
 */
export interface IWarehouseService {
  create(dto: CreateWarehouseDto): Promise<Record<string, unknown>>;
  list(): Promise<Record<string, unknown>[]>;
  getById(id: number): Promise<Record<string, unknown>>;
  update(id: number, dto: UpdateWarehouseDto): Promise<Record<string, unknown>>;
  remove(id: number): Promise<void>;
}
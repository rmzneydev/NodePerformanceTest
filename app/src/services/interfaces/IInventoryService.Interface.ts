// app/src/services/interfaces/IInventoryService.ts
import { CreateInventoryDto, UpdateInventoryDto } from "../../dto/inventory.dto";

/**
 * Contrato de lógica de negocio para inventario.
 */
export interface IInventoryService {
  create(dto: CreateInventoryDto): Promise<Record<string, unknown>>;
  list(): Promise<Record<string, unknown>[]>;
  getById(id: number): Promise<Record<string, unknown>>;
  update(id: number, dto: UpdateInventoryDto): Promise<Record<string, unknown>>;
  remove(id: number): Promise<void>;
}
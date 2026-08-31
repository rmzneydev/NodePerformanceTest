// app/src/services/warehouse.service.ts
import warehouseRepository from "../repositories/warehouse.repository";
import { NotFoundError } from "../error/AppError";
import { CreateWarehouseDto, UpdateWarehouseDto } from "../dto/warehouse.dto";
import { IWarehouseService } from "./interfaces/IWarehouseService.Interface";
import { IWarehouseRepository } from "../repositories/interfaces/IWarehouseRepository.Interface";

class WarehouseService implements IWarehouseService {
  constructor(private readonly repo: IWarehouseRepository = warehouseRepository) {}

  async create(dto: CreateWarehouseDto): Promise<Record<string, unknown>> {
    const warehouse = await this.repo.create({
      name: dto.name,
      location: dto.location,
      address: dto.address ?? null,
      isActive: true,
    });
    return this.toJSON(warehouse);
  }

  async list(): Promise<Record<string, unknown>[]> {
    const warehouses = await this.repo.findAll();
    return warehouses.map((w) => this.toJSON(w));
  }

  async getById(id: number): Promise<Record<string, unknown>> {
    const warehouse = await this.repo.findById(id);
    if (!warehouse) throw new NotFoundError("Almacén no encontrado");
    return this.toJSON(warehouse);
  }

  async update(id: number, dto: UpdateWarehouseDto): Promise<Record<string, unknown>> {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundError("Almacén no encontrado");
    const updated = await this.repo.update(id, dto);
    return this.toJSON(updated!);
  }

  async remove(id: number): Promise<void> {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundError("Almacén no encontrado");
    await this.repo.softDelete(id);
  }

  private toJSON(warehouse: import("../models/warehouse.model").Warehouse): Record<string, unknown> {
    return {
      id: warehouse.id,
      name: warehouse.name,
      location: warehouse.location,
      address: warehouse.address,
      isActive: warehouse.isActive,
    };
  }
}

export const warehouseService: IWarehouseService = new WarehouseService();
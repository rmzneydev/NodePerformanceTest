// app/src/services/inventory.service.ts
import inventoryRepository from "../repositories/inventory.repository";
import warehouseRepository from "../repositories/warehouse.repository";
import medicineRepository from "../repositories/medicine.repository";
import { ConflictError, NotFoundError } from "../error/AppError";
import { CreateInventoryDto, UpdateInventoryDto } from "../dto/inventory.dto";
import { IInventoryService } from "./interfaces/IInventoryService.Interface";
import { IInventoryRepository } from "../repositories/interfaces/IInventoryRepository.Interface";

class InventoryService implements IInventoryService {
  constructor(private readonly repo: IInventoryRepository = inventoryRepository) {}

  async create(dto: CreateInventoryDto): Promise<Record<string, unknown>> {
    const warehouse = await warehouseRepository.findById(dto.warehouseId);
    if (!warehouse) throw new NotFoundError("Almacén no encontrado");
    const medicine = await medicineRepository.findById(dto.medicineId);
    if (!medicine) throw new NotFoundError("Medicamento no encontrado");

    const exists = await this.repo.findByWarehouseAndMedicine(dto.warehouseId, dto.medicineId);
    if (exists) {
      throw new ConflictError("Ya existe inventario para ese almacén y medicamento");
    }
    const inventory = await this.repo.create({
      warehouseId: dto.warehouseId,
      medicineId: dto.medicineId,
      stock: dto.stock,
      isActive: true,
    });
    return this.toJSON(inventory);
  }

  async list(): Promise<Record<string, unknown>[]> {
    const inventory = await this.repo.findAll();
    return inventory.map((i) => this.toJSON(i));
  }

  async getById(id: number): Promise<Record<string, unknown>> {
    const inventory = await this.repo.findById(id);
    if (!inventory) throw new NotFoundError("Inventario no encontrado");
    return this.toJSON(inventory);
  }

  async update(id: number, dto: UpdateInventoryDto): Promise<Record<string, unknown>> {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundError("Inventario no encontrado");
    const updated = await this.repo.update(id, dto);
    return this.toJSON(updated!);
  }

  async remove(id: number): Promise<void> {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundError("Inventario no encontrado");
    await this.repo.softDelete(id);
  }

  private toJSON(inventory: import("../models/inventory.model").Inventory): Record<string, unknown> {
    return {
      id: inventory.id,
      warehouseId: inventory.warehouseId,
      medicineId: inventory.medicineId,
      stock: inventory.stock,
      isActive: inventory.isActive,
    };
  }
}

export const inventoryService: IInventoryService = new InventoryService();
// app/src/repositories/inventory.repository.ts
import { CreationAttributes } from "sequelize";
import { Inventory } from "../models/inventory.model";
import { IInventoryRepository } from "./interfaces/IInventoryRepository.Interface";

class InventoryRepository implements IInventoryRepository {
  async findById(id: number): Promise<Inventory | null> {
    return Inventory.findOne({ where: { id, isActive: true } });
  }

  async findByWarehouseAndMedicine(warehouseId: number, medicineId: number): Promise<Inventory | null> {
    return Inventory.findOne({ where: { warehouseId, medicineId, isActive: true } });
  }

  async findAll(): Promise<Inventory[]> {
    return Inventory.findAll({ where: { isActive: true }, order: [["createdAt", "DESC"]] });
  }

  async create(data: CreationAttributes<Inventory>): Promise<Inventory> {
    return Inventory.create(data);
  }

  async update(id: number, data: Partial<CreationAttributes<Inventory>>): Promise<Inventory | null> {
    const inventory = await this.findById(id);
    if (!inventory) return null;
    return inventory.update(data);
  }

  async softDelete(id: number): Promise<boolean> {
    const inventory = await this.findById(id);
    if (!inventory) return false;
    await inventory.update({ isActive: false });
    return true;
  }
}

export default new InventoryRepository();
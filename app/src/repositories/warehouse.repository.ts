// app/src/repositories/warehouse.repository.ts
import { CreationAttributes } from "sequelize";
import { Warehouse } from "../models/warehouse.model";
import { IWarehouseRepository } from "./interfaces/IWarehouseRepository.Interface";

class WarehouseRepository implements IWarehouseRepository {
  async findById(id: number): Promise<Warehouse | null> {
    return Warehouse.findOne({ where: { id, isActive: true } });
  }

  async findAll(): Promise<Warehouse[]> {
    return Warehouse.findAll({ where: { isActive: true }, order: [["createdAt", "DESC"]] });
  }

  async create(data: CreationAttributes<Warehouse>): Promise<Warehouse> {
    return Warehouse.create(data);
  }

  async update(id: number, data: Partial<CreationAttributes<Warehouse>>): Promise<Warehouse | null> {
    const warehouse = await this.findById(id);
    if (!warehouse) return null;
    return warehouse.update(data);
  }

  async softDelete(id: number): Promise<boolean> {
    const warehouse = await this.findById(id);
    if (!warehouse) return false;
    await warehouse.update({ isActive: false });
    return true;
  }
}

export default new WarehouseRepository();
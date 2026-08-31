// app/src/repositories/medicine.repository.ts
import { CreationAttributes } from "sequelize";
import { Medicine } from "../models/medicine.model";
import { IMedicineRepository } from "./interfaces/IMedicineRepository.Interface";

class MedicineRepository implements IMedicineRepository {
  async findById(id: number): Promise<Medicine | null> {
    return Medicine.findOne({ where: { id, isActive: true } });
  }

  async findByCode(code: string): Promise<Medicine | null> {
    return Medicine.findOne({ where: { code, isActive: true } });
  }

  async findAll(): Promise<Medicine[]> {
    return Medicine.findAll({ where: { isActive: true }, order: [["createdAt", "DESC"]] });
  }

  async create(data: CreationAttributes<Medicine>): Promise<Medicine> {
    return Medicine.create(data);
  }

  async update(id: number, data: Partial<CreationAttributes<Medicine>>): Promise<Medicine | null> {
    const medicine = await this.findById(id);
    if (!medicine) return null;
    return medicine.update(data);
  }

  async softDelete(id: number): Promise<boolean> {
    const medicine = await this.findById(id);
    if (!medicine) return false;
    await medicine.update({ isActive: false });
    return true;
  }
}

export default new MedicineRepository();
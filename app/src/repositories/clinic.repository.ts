// app/src/repositories/clinic.repository.ts
import { CreationAttributes } from "sequelize";
import { Clinic } from "../models/clinic.model";
import { IClinicRepository } from "./interfaces/IClinicRepository.Interface";

class ClinicRepository implements IClinicRepository {
  async findById(id: number): Promise<Clinic | null> {
    return Clinic.findOne({ where: { id, isActive: true } });
  }

  async findByNit(nit: string): Promise<Clinic | null> {
    return Clinic.findOne({ where: { nit, isActive: true } });
  }

  async findAll(): Promise<Clinic[]> {
    return Clinic.findAll({ where: { isActive: true }, order: [["createdAt", "DESC"]] });
  }

  async create(data: CreationAttributes<Clinic>): Promise<Clinic> {
    return Clinic.create(data);
  }

  async update(id: number, data: Partial<CreationAttributes<Clinic>>): Promise<Clinic | null> {
    const clinic = await this.findById(id);
    if (!clinic) return null;
    return clinic.update(data);
  }

  async softDelete(id: number): Promise<boolean> {
    const clinic = await this.findById(id);
    if (!clinic) return false;
    await clinic.update({ isActive: false });
    return true;
  }
}

export default new ClinicRepository();
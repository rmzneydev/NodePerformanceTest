// app/src/repositories/interfaces/IMedicineRepository.ts
import { CreationAttributes } from "sequelize";
import { Medicine } from "../../models/medicine.model";

/**
 * Contrato de persistencia para medicamentos.
 */
export interface IMedicineRepository {
  findById(id: number): Promise<Medicine | null>;
  findByCode(code: string): Promise<Medicine | null>;
  findAll(): Promise<Medicine[]>;
  create(data: CreationAttributes<Medicine>): Promise<Medicine>;
  update(id: number, data: Partial<CreationAttributes<Medicine>>): Promise<Medicine | null>;
  softDelete(id: number): Promise<boolean>;
}
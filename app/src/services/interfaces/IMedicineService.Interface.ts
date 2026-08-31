// app/src/services/interfaces/IMedicineService.ts
import { CreateMedicineDto, UpdateMedicineDto } from "../../dto/medicine.dto";

/**
 * Contrato de lógica de negocio para medicamentos.
 */
export interface IMedicineService {
  create(dto: CreateMedicineDto): Promise<Record<string, unknown>>;
  list(): Promise<Record<string, unknown>[]>;
  getById(id: number): Promise<Record<string, unknown>>;
  update(id: number, dto: UpdateMedicineDto): Promise<Record<string, unknown>>;
  remove(id: number): Promise<void>;
}
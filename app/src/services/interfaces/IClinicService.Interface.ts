// app/src/services/interfaces/IClinicService.ts
import { CreateClinicDto, UpdateClinicDto } from "../../dto/clinic.dto";

/**
 * Contrato de lógica de negocio para clínicas.
 */
export interface IClinicService {
  create(dto: CreateClinicDto): Promise<Record<string, unknown>>;
  list(): Promise<Record<string, unknown>[]>;
  getById(id: number): Promise<Record<string, unknown>>;
  update(id: number, dto: UpdateClinicDto): Promise<Record<string, unknown>>;
  remove(id: number): Promise<void>;
}
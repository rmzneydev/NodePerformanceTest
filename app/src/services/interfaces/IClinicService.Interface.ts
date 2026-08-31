// app/src/services/interfaces/IClinicService.ts
import { CreateClinicDto, UpdateClinicDto } from "../../dto/clinic.dto";

/**
 * Resultado de una operación de listado.
 * Incluye un mensaje opcional cuando la lógica de negocio lo determine.
 */
export interface ListResult {
  data: Record<string, unknown>[];
  message?: string;
}

/**
 * Contrato de lógica de negocio para clínicas.
 */
export interface IClinicService {
  create(dto: CreateClinicDto): Promise<Record<string, unknown>>;
  list(): Promise<ListResult>;
  getById(id: number): Promise<Record<string, unknown>>;
  update(id: number, dto: UpdateClinicDto): Promise<Record<string, unknown>>;
  remove(id: number): Promise<void>;
}

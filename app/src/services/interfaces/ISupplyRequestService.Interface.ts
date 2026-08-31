// app/src/services/interfaces/ISupplyRequestService.ts
import {
  CreateSupplyRequestDto,
  UpdateSupplyRequestDto,
  UpdateSupplyRequestStatusDto,
} from "../../dto/supplyRequest.dto";

/**
 * Contrato de lógica de negocio para solicitudes de abastecimiento.
 */
export interface ISupplyRequestService {
  create(dto: CreateSupplyRequestDto): Promise<Record<string, unknown>>;
  list(): Promise<Record<string, unknown>[]>;
  listActive(): Promise<Record<string, unknown>[]>;
  listByClinic(clinicId: number): Promise<Record<string, unknown>[]>;
  getById(id: number): Promise<Record<string, unknown>>;
  update(id: number, dto: UpdateSupplyRequestDto): Promise<Record<string, unknown>>;
  changeStatus(id: number, dto: UpdateSupplyRequestStatusDto): Promise<Record<string, unknown>>;
  remove(id: number): Promise<void>;
}
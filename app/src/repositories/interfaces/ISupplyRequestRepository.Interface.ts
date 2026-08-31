// app/src/repositories/interfaces/ISupplyRequestRepository.ts
import { CreationAttributes } from "sequelize";
import { SupplyRequest } from "../../models/supplyRequest.model";

/**
 * Contrato de persistencia para solicitudes de abastecimiento.
 */
export interface ISupplyRequestRepository {
  findById(id: number): Promise<SupplyRequest | null>;
  findAll(): Promise<SupplyRequest[]>;
  findActive(): Promise<SupplyRequest[]>;
  findByClinic(clinicId: number): Promise<SupplyRequest[]>;
  create(data: CreationAttributes<SupplyRequest>): Promise<SupplyRequest>;
  update(id: number, data: Partial<CreationAttributes<SupplyRequest>>): Promise<SupplyRequest | null>;
  softDelete(id: number): Promise<boolean>;
}
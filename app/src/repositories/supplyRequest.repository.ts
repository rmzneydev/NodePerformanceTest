// app/src/repositories/supplyRequest.repository.ts
import { CreationAttributes } from "sequelize";
import { SupplyRequest, SUPPLY_REQUEST_STATUS } from "../models/supplyRequest.model";
import { ISupplyRequestRepository } from "./interfaces/ISupplyRequestRepository.Interface";

class SupplyRequestRepository implements ISupplyRequestRepository {
  async findById(id: number): Promise<SupplyRequest | null> {
    return SupplyRequest.findOne({ where: { id, isActive: true } });
  }

  async findAll(): Promise<SupplyRequest[]> {
    return SupplyRequest.findAll({ where: { isActive: true }, order: [["createdAt", "DESC"]] });
  }

  async findActive(): Promise<SupplyRequest[]> {
    return SupplyRequest.findAll({
      where: {
        isActive: true,
        status: [
          SUPPLY_REQUEST_STATUS.PENDING,
          SUPPLY_REQUEST_STATUS.APPROVED,
          SUPPLY_REQUEST_STATUS.DISPATCHED,
        ],
      },
      order: [["createdAt", "DESC"]],
    });
  }

  async findByClinic(clinicId: number): Promise<SupplyRequest[]> {
    return SupplyRequest.findAll({ where: { clinicId, isActive: true }, order: [["createdAt", "DESC"]] });
  }

  async create(data: CreationAttributes<SupplyRequest>): Promise<SupplyRequest> {
    return SupplyRequest.create(data);
  }

  async update(id: number, data: Partial<CreationAttributes<SupplyRequest>>): Promise<SupplyRequest | null> {
    const request = await this.findById(id);
    if (!request) return null;
    return request.update(data);
  }

  async softDelete(id: number): Promise<boolean> {
    const request = await this.findById(id);
    if (!request) return false;
    await request.update({ isActive: false });
    return true;
  }
}

export default new SupplyRequestRepository();
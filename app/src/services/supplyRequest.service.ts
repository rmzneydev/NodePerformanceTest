// app/src/services/supplyRequest.service.ts
import supplyRequestRepository from "../repositories/supplyRequest.repository";
import inventoryRepository from "../repositories/inventory.repository";
import clinicRepository from "../repositories/clinic.repository";
import medicineRepository from "../repositories/medicine.repository";
import { BadRequestError, NotFoundError } from "../error/AppError";
import {
  CreateSupplyRequestDto,
  UpdateSupplyRequestDto,
  UpdateSupplyRequestStatusDto,
} from "../dto/supplyRequest.dto";
import { ISupplyRequestService } from "./interfaces/ISupplyRequestService.Interface";
import { ISupplyRequestRepository } from "../repositories/interfaces/ISupplyRequestRepository.Interface";
import { canTransition } from "../models/supplyRequest.model";

class SupplyRequestService implements ISupplyRequestService {
  constructor(private readonly repo: ISupplyRequestRepository = supplyRequestRepository) {}

  async create(dto: CreateSupplyRequestDto): Promise<Record<string, unknown>> {
    const clinic = await clinicRepository.findById(dto.clinicId);
    if (!clinic) throw new NotFoundError("Clínica no encontrada");
    const medicine = await medicineRepository.findById(dto.medicineId);
    if (!medicine) throw new NotFoundError("Medicamento no encontrado");

    const inventory = await inventoryRepository.findByWarehouseAndMedicine(
      dto.warehouseId,
      dto.medicineId
    );
    if (!inventory || inventory.stock < dto.quantity) {
      throw new BadRequestError("Inventario insuficiente en el almacén asignado");
    }

    const request = await this.repo.create({
      clinicId: dto.clinicId,
      warehouseId: dto.warehouseId,
      medicineId: dto.medicineId,
      quantity: dto.quantity,
    });

    await inventoryRepository.update(inventory.id, { stock: inventory.stock - dto.quantity });
    return this.toJSON(request);
  }

  async list(): Promise<Record<string, unknown>[]> {
    const requests = await this.repo.findAll();
    return requests.map((r) => this.toJSON(r));
  }

  async listActive(): Promise<Record<string, unknown>[]> {
    const requests = await this.repo.findActive();
    return requests.map((r) => this.toJSON(r));
  }

  async listByClinic(clinicId: number): Promise<Record<string, unknown>[]> {
    const requests = await this.repo.findByClinic(clinicId);
    return requests.map((r) => this.toJSON(r));
  }

  async getById(id: number): Promise<Record<string, unknown>> {
    const request = await this.repo.findById(id);
    if (!request) throw new NotFoundError("Solicitud no encontrada");
    return this.toJSON(request);
  }

  async update(id: number, dto: UpdateSupplyRequestDto): Promise<Record<string, unknown>> {
    const request = await this.repo.findById(id);
    if (!request) throw new NotFoundError("Solicitud no encontrada");
    const updated = await this.repo.update(id, dto);
    return this.toJSON(updated!);
  }

  async changeStatus(id: number, dto: UpdateSupplyRequestStatusDto): Promise<Record<string, unknown>> {
    const request = await this.repo.findById(id);
    if (!request) throw new NotFoundError("Solicitud no encontrada");
    if (!canTransition(request.status, dto.status)) {
      throw new BadRequestError(
        `No se permite la transición de estado ${request.status} a ${dto.status}`
      );
    }
    const updated = await this.repo.update(id, { status: dto.status });
    return this.toJSON(updated!);
  }

  async remove(id: number): Promise<void> {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundError("Solicitud no encontrada");
    await this.repo.softDelete(id);
  }

  private toJSON(request: import("../models/supplyRequest.model").SupplyRequest): Record<string, unknown> {
    return {
      id: request.id,
      clinicId: request.clinicId,
      warehouseId: request.warehouseId,
      medicineId: request.medicineId,
      quantity: request.quantity,
      status: request.status,
      isActive: request.isActive,
    };
  }
}

export const supplyRequestService: ISupplyRequestService = new SupplyRequestService();
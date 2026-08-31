// app/src/services/medicine.service.ts
import medicineRepository from "../repositories/medicine.repository";
import { ConflictError, NotFoundError } from "../error/AppError";
import { CreateMedicineDto, UpdateMedicineDto } from "../dto/medicine.dto";
import { IMedicineService } from "./interfaces/IMedicineService.Interface";
import { IMedicineRepository } from "../repositories/interfaces/IMedicineRepository.Interface";

class MedicineService implements IMedicineService {
  constructor(private readonly repo: IMedicineRepository = medicineRepository) {}

  async create(dto: CreateMedicineDto): Promise<Record<string, unknown>> {
    const exists = await this.repo.findByCode(dto.code);
    if (exists) {
      throw new ConflictError("Ya existe un medicamento con ese código");
    }
    const medicine = await this.repo.create({
      name: dto.name,
      code: dto.code,
      description: dto.description ?? null,
      manufacturer: dto.manufacturer ?? null,
      isActive: true,
    });
    return this.toJSON(medicine);
  }

  async list(): Promise<Record<string, unknown>[]> {
    const medicines = await this.repo.findAll();
    return medicines.map((m) => this.toJSON(m));
  }

  async getById(id: number): Promise<Record<string, unknown>> {
    const medicine = await this.repo.findById(id);
    if (!medicine) throw new NotFoundError("Medicamento no encontrado");
    return this.toJSON(medicine);
  }

  async update(id: number, dto: UpdateMedicineDto): Promise<Record<string, unknown>> {
    const medicine = await this.repo.findById(id);
    if (!medicine) throw new NotFoundError("Medicamento no encontrado");

    if (dto.code && dto.code !== medicine.code) {
      const exists = await this.repo.findByCode(dto.code);
      if (exists) throw new ConflictError("Ya existe un medicamento con ese código");
    }
    const updated = await this.repo.update(id, dto);
    return this.toJSON(updated!);
  }

  async remove(id: number): Promise<void> {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundError("Medicamento no encontrado");
    await this.repo.softDelete(id);
  }

  private toJSON(medicine: import("../models/medicine.model").Medicine): Record<string, unknown> {
    return {
      id: medicine.id,
      name: medicine.name,
      code: medicine.code,
      description: medicine.description,
      manufacturer: medicine.manufacturer,
      isActive: medicine.isActive,
    };
  }
}

export const medicineService: IMedicineService = new MedicineService();
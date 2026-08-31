// app/src/services/clinic.service.ts
import clinicRepository from "../repositories/clinic.repository";
import { ConflictError, NotFoundError } from "../error/AppError";
import { CreateClinicDto, UpdateClinicDto } from "../dto/clinic.dto";
import { ListResult, IClinicService } from "./interfaces/IClinicService.Interface";
import { IClinicRepository } from "../repositories/interfaces/IClinicRepository.Interface";
import { User } from "../models/user.model";

class ClinicService implements IClinicService {
  constructor(private readonly repo: IClinicRepository = clinicRepository) {}

  async create(dto: CreateClinicDto): Promise<Record<string, unknown>> {
    const exists = await this.repo.findByNit(dto.nit);
    if (exists) {
      throw new ConflictError("Ya existe una clínica con ese NIT");
    }
    const responsible = await User.findByPk(dto.responsibleUserId);
    if (!responsible) {
      throw new NotFoundError("El usuario responsable no existe");
    }
    const clinic = await this.repo.create({
      name: dto.name,
      nit: dto.nit,
      address: dto.address ?? null,
      phone: dto.phone ?? null,
      responsibleUserId: dto.responsibleUserId,
      isActive: true,
    });
    return this.toJSON(clinic);
  }

  async list(): Promise<ListResult> {
    const clinics = await this.repo.findAll();
    if (clinics.length === 0) {
      return { data: [], message: "No hay clínicas registradas" };
    }
    return { data: clinics.map((c) => this.toJSON(c)) };
  }

  async getById(id: number): Promise<Record<string, unknown>> {
    const clinic = await this.repo.findById(id);
    if (!clinic) throw new NotFoundError("Clínica no encontrada");
    return this.toJSON(clinic);
  }

  async update(id: number, dto: UpdateClinicDto): Promise<Record<string, unknown>> {
    const clinic = await this.repo.findById(id);
    if (!clinic) throw new NotFoundError("Clínica no encontrada");

    if (dto.nit && dto.nit !== clinic.nit) {
      const exists = await this.repo.findByNit(dto.nit);
      if (exists) throw new ConflictError("Ya existe una clínica con ese NIT");
    }
    if (dto.responsibleUserId !== undefined) {
      const responsible = await User.findByPk(dto.responsibleUserId);
      if (!responsible) throw new NotFoundError("El usuario responsable no existe");
    }
    const updated = await this.repo.update(id, dto);
    return this.toJSON(updated!);
  }

  async remove(id: number): Promise<void> {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundError("Clínica no encontrada");
    await this.repo.softDelete(id);
  }

  private toJSON(clinic: import("../models/clinic.model").Clinic): Record<string, unknown> {
    return {
      id: clinic.id,
      name: clinic.name,
      nit: clinic.nit,
      address: clinic.address,
      phone: clinic.phone,
      responsibleUserId: clinic.responsibleUserId,
      isActive: clinic.isActive,
    };
  }
}

export const clinicService: IClinicService = new ClinicService();
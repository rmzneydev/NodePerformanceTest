// app/src/services/seeder.service.ts
import { User } from "../models/user.model";
import { Clinic } from "../models/clinic.model";
import { Warehouse } from "../models/warehouse.model";
import { Medicine } from "../models/medicine.model";
import { SeedFileDto, SeedResult } from "../dto/seeder.dto";
import { ISeederService } from "./interfaces/ISeederService.Interface";

/**
 * Resultado acumulador interno del proceso de seeding.
 */
interface SeedCounters {
  users: number;
  clinics: number;
  warehouses: number;
  medicines: number;
  created: number;
  skipped: number;
}

class SeederService implements ISeederService {
  /**
   * Procesa un payload JSON y puebla la base de datos de forma idempotente.
   * Las inserciones son secuenciales: usuarios primero (para poder referenciar
   * sus ids como responsables de clínicas cuando aplica).
   */
  async seed(payload: SeedFileDto): Promise<SeedResult> {
    const counters: SeedCounters = {
      users: 0,
      clinics: 0,
      warehouses: 0,
      medicines: 0,
      created: 0,
      skipped: 0,
    };

    if (payload.users?.length) {
      await this.processUsers(payload.users, counters);
    }
    if (payload.clinics?.length) {
      await this.processClinics(payload.clinics, counters);
    }
    if (payload.warehouses?.length) {
      await this.processWarehouses(payload.warehouses, counters);
    }
    if (payload.medicines?.length) {
      await this.processMedicines(payload.medicines, counters);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return {
      users: counters.users,
      clinics: counters.clinics,
      warehouses: counters.warehouses,
      medicines: counters.medicines,
      created: counters.created,
      skipped: counters.skipped,
    };
  }

  private async processUsers(data: import("../dto/seeder.dto").SeedUserDto[], counters: SeedCounters): Promise<void> {
    counters.users = data.length;
    for (const item of data) {
      const userData = {
        name: item.name,
        email: item.email,
        password: item.password,
        role: item.role ?? "manager",
        isActive: item.isActive ?? true,
      };
      const [_, created] = await User.findOrCreate({
        where: { email: item.email },
        defaults: userData as never,
      });
      this.tally(created, counters);
    }
  }

  private async processClinics(data: import("../dto/seeder.dto").SeedClinicDto[], counters: SeedCounters): Promise<void> {
    counters.clinics = data.length;
    for (const item of data) {
      let responsibleUserId = item.responsibleUserId;
      if (!responsibleUserId) {
        const responsible = await User.findOne({ where: { role: "manager" } });
        if (responsible) responsibleUserId = responsible.id;
      }
      const clinicData = {
        name: item.name,
        nit: item.nit,
        address: item.address ?? null,
        phone: item.phone ?? null,
        responsibleUserId: responsibleUserId as number,
        isActive: item.isActive ?? true,
      };
      const [_, created] = await Clinic.findOrCreate({
        where: { nit: item.nit },
        defaults: clinicData as never,
      });
      this.tally(created, counters);
    }
  }

  private async processWarehouses(data: import("../dto/seeder.dto").SeedWarehouseDto[], counters: SeedCounters): Promise<void> {
    counters.warehouses = data.length;
    for (const item of data) {
      const warehouseData = {
        name: item.name,
        location: item.location,
        address: item.address ?? null,
        isActive: item.isActive ?? true,
      };
      const [_, created] = await Warehouse.findOrCreate({
        where: { name: item.name },
        defaults: warehouseData as never,
      });
      this.tally(created, counters);
    }
  }

  private async processMedicines(data: import("../dto/seeder.dto").SeedMedicineDto[], counters: SeedCounters): Promise<void> {
    counters.medicines = data.length;
    for (const item of data) {
      const medicineData = {
        name: item.name,
        code: item.code,
        description: item.description ?? null,
        manufacturer: item.manufacturer ?? null,
        isActive: item.isActive ?? true,
      };
      const [_, created] = await Medicine.findOrCreate({
        where: { code: item.code },
        defaults: medicineData as never,
      });
      this.tally(created, counters);
    }
  }

  private tally(created: boolean, counters: SeedCounters): void {
    if (created) counters.created += 1;
    else counters.skipped += 1;
  }
}

export const seederService: ISeederService = new SeederService();
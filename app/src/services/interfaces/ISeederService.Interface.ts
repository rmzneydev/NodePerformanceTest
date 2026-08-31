// app/src/services/interfaces/ISeederService.ts
import { SeedFileDto, SeedResult } from "../../dto/seeder.dto";

/**
 * Contrato de lógica de negocio para el seeding por archivo JSON.
 */
export interface ISeederService {
  seed(payload: SeedFileDto): Promise<SeedResult>;
}
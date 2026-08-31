// app/src/repositories/interfaces/IClinicRepository.ts
import { CreationAttributes } from "sequelize";
import { Clinic } from "../../models/clinic.model";

/**
 * Contrato de persistencia para clínicas.
 */
export interface IClinicRepository {
  /**
   * Busca una clínica por su id.
   */
  findById(id: number): Promise<Clinic | null>;
  /**
   * Busca una clínica por su NIT.
   */
  findByNit(nit: string): Promise<Clinic | null>;
  /**
   * Lista todas las clínicas activas.
   */
  findAll(): Promise<Clinic[]>;
  /**
   * Crea una nueva clínica.
   */
  create(data: CreationAttributes<Clinic>): Promise<Clinic>;
  /**
   * Actualiza parcialmente una clínica.
   */
  update(id: number, data: Partial<CreationAttributes<Clinic>>): Promise<Clinic | null>;
  /**
   * Marca una clínica como inactiva (borrado lógico).
   */
  softDelete(id: number): Promise<boolean>;
}
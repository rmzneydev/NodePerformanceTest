// app/src/dto/clinic.dto.ts

/**
 * Datos requeridos para crear una clínica.
 */
export interface CreateClinicDto {
  /**
   * Nombre de la clínica.
   */
  name: string;
  /**
   * NIT de la clínica (único).
   */
  nit: string;
  /**
   * Dirección de la clínica.
   */
  address?: string;
  /**
   * Teléfono de la clínica.
   */
  phone?: string;
  /**
   * Id del usuario responsable de la clínica.
   */
  responsibleUserId: number;
}

/**
 * Datos editables de una clínica (todos opcionales).
 */
export interface UpdateClinicDto {
  name?: string;
  nit?: string;
  address?: string;
  phone?: string;
  responsibleUserId?: number;
}
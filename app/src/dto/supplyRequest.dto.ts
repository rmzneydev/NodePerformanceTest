// app/src/dto/supplyRequest.dto.ts
import { SupplyRequestStatus } from "../models/supplyRequest.model";

/**
 * Datos requeridos para crear una solicitud de abastecimiento.
 */
export interface CreateSupplyRequestDto {
  /**
   * Id de la clínica solicitante.
   */
  clinicId: number;
  /**
   * Id del almacén asignado.
   */
  warehouseId: number;
  /**
   * Id del medicamento solicitado.
   */
  medicineId: number;
  /**
   * Cantidad solicitada (mayor a cero).
   */
  quantity: number;
}

/**
 * Datos para actualizar una solicitud (admin, CRUD completo).
 */
export interface UpdateSupplyRequestDto {
  clinicId?: number;
  warehouseId?: number;
  medicineId?: number;
  quantity?: number;
}

/**
 * Datos para cambiar el estado de una solicitud (gestor).
 */
export interface UpdateSupplyRequestStatusDto {
  /**
   * Nuevo estado de la solicitud.
   */
  status: SupplyRequestStatus;
}
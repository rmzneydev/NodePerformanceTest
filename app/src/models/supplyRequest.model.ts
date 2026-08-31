// app/src/models/supplyRequest.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

/**
 * Estados posibles del ciclo de vida de una solicitud de abastecimiento.
 * Los estados terminales (REJECTED, DELIVERED, CANCELLED) no admiten
 * transiciones posteriores.
 */
export const SUPPLY_REQUEST_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  DISPATCHED: "DISPATCHED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export type SupplyRequestStatus =
  (typeof SUPPLY_REQUEST_STATUS)[keyof typeof SUPPLY_REQUEST_STATUS];

/**
 * Mapa de transiciones de estado permitidas.
 */
export const SUPPLY_REQUEST_TRANSITIONS: Record<SupplyRequestStatus, SupplyRequestStatus[]> = {
  [SUPPLY_REQUEST_STATUS.PENDING]: [
    SUPPLY_REQUEST_STATUS.APPROVED,
    SUPPLY_REQUEST_STATUS.REJECTED,
    SUPPLY_REQUEST_STATUS.CANCELLED,
  ],
  [SUPPLY_REQUEST_STATUS.APPROVED]: [
    SUPPLY_REQUEST_STATUS.DISPATCHED,
    SUPPLY_REQUEST_STATUS.CANCELLED,
  ],
  [SUPPLY_REQUEST_STATUS.DISPATCHED]: [SUPPLY_REQUEST_STATUS.DELIVERED],
  [SUPPLY_REQUEST_STATUS.REJECTED]: [],
  [SUPPLY_REQUEST_STATUS.DELIVERED]: [],
  [SUPPLY_REQUEST_STATUS.CANCELLED]: [],
};

/**
 * Valida si una solicitud puede pasar del estado `from` al estado `to`.
 */
export function canTransition(
  from: SupplyRequestStatus,
  to: SupplyRequestStatus
): boolean {
  return SUPPLY_REQUEST_TRANSITIONS[from]?.includes(to) ?? false;
}

export interface SupplyRequestAttributes {
  id: number;
  clinicId: number;
  warehouseId: number;
  medicineId: number;
  quantity: number;
  status: SupplyRequestStatus;
  isActive: boolean;
}

export interface SupplyRequestCreationAttributes
  extends Optional<SupplyRequestAttributes, "id" | "status" | "isActive"> {}

export class SupplyRequest
  extends Model<SupplyRequestAttributes, SupplyRequestCreationAttributes>
  implements SupplyRequestAttributes {
  public id!: number;
  public clinicId!: number;
  public warehouseId!: number;
  public medicineId!: number;
  public quantity!: number;
  public status!: SupplyRequestStatus;
  public isActive!: boolean;
}

SupplyRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clinicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "clinic_id",
      references: {
        model: "clinics",
        key: "id",
      },
    },
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "warehouse_id",
      references: {
        model: "warehouses",
        key: "id",
      },
    },
    medicineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "medicine_id",
      references: {
        model: "medicines",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    status: {
      type: DataTypes.ENUM(...Object.values(SUPPLY_REQUEST_STATUS)),
      allowNull: false,
      defaultValue: SUPPLY_REQUEST_STATUS.PENDING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    sequelize,
    tableName: "supply_requests",
    underscored: true,
    timestamps: true,
  }
);

export default SupplyRequest;
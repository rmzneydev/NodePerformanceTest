// app/src/models/clinic.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface ClinicAttributes {
  id: number;
  name: string;
  nit: string;
  address: string | null;
  phone: string | null;
  responsibleUserId: number;
  isActive: boolean;
}

export interface ClinicCreationAttributes
  extends Optional<ClinicAttributes, "id" | "address" | "phone" | "responsibleUserId" | "isActive"> {}

export class Clinic
  extends Model<ClinicAttributes, ClinicCreationAttributes>
  implements ClinicAttributes {
  public id!: number;
  public name!: string;
  public nit!: string;
  public address!: string | null;
  public phone!: string | null;
  public responsibleUserId!: number;
  public isActive!: boolean;
}

Clinic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nit: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    responsibleUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "responsible_user_id",
      references: {
        model: "users",
        key: "id",
      },
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
    tableName: "clinics",
    underscored: true,
    timestamps: true,
  }
);

export default Clinic;
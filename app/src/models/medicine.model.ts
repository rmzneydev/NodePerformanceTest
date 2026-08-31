// app/src/models/medicine.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface MedicineAttributes {
  id: number; 
  name: string;
  code: string;
  description: string | null;
  manufacturer: string | null;
  isActive: boolean;
}

export interface MedicineCreationAttributes
  extends Optional<MedicineAttributes, "id" | "description" | "manufacturer" | "isActive"> {}

export class Medicine
  extends Model<MedicineAttributes, MedicineCreationAttributes>
  implements MedicineAttributes {  
  public id!: number;
  public name!: string;
  public code!: string;
  public description!: string | null;
  public manufacturer!: string | null;
  public isActive!: boolean;
}

Medicine.init(
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
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    manufacturer: {
      type: DataTypes.STRING(150),
      allowNull: true,
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
    tableName: "medicines",
    underscored: true,
    timestamps: true,
  }
);

export default Medicine;
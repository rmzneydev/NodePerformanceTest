// app/src/models/warehouse.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface WarehouseAttributes {
  id: number;
  name: string;
  location: string;
  address: string | null;
  isActive: boolean;
}

export interface WarehouseCreationAttributes
  extends Optional<WarehouseAttributes, "id" | "address" | "isActive"> {}

export class Warehouse
  extends Model<WarehouseAttributes, WarehouseCreationAttributes>
  implements WarehouseAttributes {
  public id!: number;
  public name!: string;
  public location!: string;
  public address!: string | null;
  public isActive!: boolean;
}

Warehouse.init(
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
    location: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.STRING(255),
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
    tableName: "warehouses",
    underscored: true,
    timestamps: true,
  }
);

export default Warehouse;
// app/src/models/inventory.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface InventoryAttributes {
  id: number;
  warehouseId: number;
  medicineId: number;
  stock: number;
  isActive: boolean;
}

export interface InventoryCreationAttributes
  extends Optional<InventoryAttributes, "id" | "isActive"> {}

export class Inventory
  extends Model<InventoryAttributes, InventoryCreationAttributes>
  implements InventoryAttributes {
  public id!: number;
  public warehouseId!: number;
  public medicineId!: number;
  public stock!: number;
  public isActive!: boolean;
}

Inventory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
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
    tableName: "inventories",
    underscored: true,
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["warehouse_id", "medicine_id"],
        name: "uq_inventory_warehouse_medicine",
      },
    ],
  }
);

export default Inventory;
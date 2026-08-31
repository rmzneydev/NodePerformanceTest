// app/src/models/index.ts
import sequelize from "../config/database";
import { User } from "./user.model";
import { Clinic } from "./clinic.model";
import { Warehouse } from "./warehouse.model";
import { Medicine } from "./medicine.model";
import { Inventory } from "./inventory.model";
import { SupplyRequest } from "./supplyRequest.model";

// Asociaciones (deben definirse antes de sequelize.sync)
Clinic.belongsTo(User, { foreignKey: "responsibleUserId", as: "responsible" });
User.hasMany(Clinic, { foreignKey: "responsibleUserId", as: "clinics" });

Inventory.belongsTo(Warehouse, { foreignKey: "warehouseId", as: "warehouse" });
Inventory.belongsTo(Medicine, { foreignKey: "medicineId", as: "medicine" });
Warehouse.hasMany(Inventory, { foreignKey: "warehouseId", as: "inventory" });
Medicine.hasMany(Inventory, { foreignKey: "medicineId", as: "inventory" });

SupplyRequest.belongsTo(Clinic, { foreignKey: "clinicId", as: "clinic" });
SupplyRequest.belongsTo(Warehouse, { foreignKey: "warehouseId", as: "warehouse" });
SupplyRequest.belongsTo(Medicine, { foreignKey: "medicineId", as: "medicine" });
Clinic.hasMany(SupplyRequest, { foreignKey: "clinicId", as: "supplyRequests" });
Warehouse.hasMany(SupplyRequest, { foreignKey: "warehouseId", as: "supplyRequests" });
Medicine.hasMany(SupplyRequest, { foreignKey: "medicineId", as: "supplyRequests" });

export {
  User,
  Clinic,
  Warehouse,
  Medicine,
  Inventory,
  SupplyRequest,
};
export { sequelize };

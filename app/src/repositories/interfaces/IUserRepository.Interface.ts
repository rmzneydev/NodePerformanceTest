// app/src/repositories/interfaces/IUserRepository.ts
import { CreationAttributes } from "sequelize";
import { User } from "../../models/user.model";

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findAllActive(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findActiveById(id: number): Promise<User | null>;
  create(data: CreationAttributes<User>): Promise<User>;
  update(id: number, data: Partial<CreationAttributes<User>>): Promise<User | null>;
  delete(id: number): Promise<boolean>;
}

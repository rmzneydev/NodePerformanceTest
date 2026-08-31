// app/src/repositories/user.repository.ts
import { CreationAttributes } from "sequelize";
import { User } from "../models/user.model";
import { IUserRepository } from "./interfaces/IUserRepository.Interface";

class UserRepository implements IUserRepository {
  async findById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  async findAllActive(): Promise<User[]> {
    return User.findAll({
      where: { isActive: true },
      order: [["createdAt", "DESC"]],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email: email } });
  }

  async findActiveById(id: number): Promise<User | null> {
    return User.findOne({ where: { id, isActive: true } });
  }

  async create(data: CreationAttributes<User>): Promise<User> {
    return User.create(data);
  }

  async update(id: number, data: Partial<CreationAttributes<User>>): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;
    return user.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const count = await User.destroy({ where: { id } as never });
    return count > 0;
  }
}


export default new UserRepository();

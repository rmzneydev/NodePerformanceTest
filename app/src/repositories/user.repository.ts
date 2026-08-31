// app/src/repositories/user.repository.ts
import { CreationAttributes } from "sequelize";
import { User } from "../models/user.model";
import { IUserRepository } from "./interfaces/IUserRepository.Interface";

class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email: email } });
  }

  async create(data: CreationAttributes<User>): Promise<User> {
    return User.create(data);
  }
}

export default new UserRepository();

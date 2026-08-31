// app/src/repositories/interfaces/IUserRepository.ts
import { CreationAttributes } from "sequelize";
import { User } from "../../models/user.model";

/**
 * Contrato de persistencia para usuarios.
 * Solo expone las operaciones que el módulo de autenticación requiere:
 * buscar por email y crear.
 */
export interface IUserRepository {
  /**
   * Busca un usuario por su dirección de correo electrónico.
   */
  findByEmail(email: string): Promise<User | null>;
  /**
   * Crea un nuevo usuario.
   */
  create(data: CreationAttributes<User>): Promise<User>;
}

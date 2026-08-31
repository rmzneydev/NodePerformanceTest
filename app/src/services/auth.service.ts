// app/src/services/auth.service.ts
import userRepository from "../repositories/user.repository";
import { ConflictError, UnauthorizedError } from "../error/AppError";
import { comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";
import { RegisterDto, LoginDto } from "../dto/user.dto";
import { IAuthService } from "./interfaces/IAuthService.Interface";
import { sanitizeUser } from "../utils/sanitize";

export const authService: IAuthService = {
  async register(dto: RegisterDto) {
    const exists = await userRepository.findByEmail(dto.email);
    if (exists) {
      throw new ConflictError("Email ya registrado");
    }
    const user = await userRepository.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role ?? "manager",
      isActive: true,
    } as never);

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    return { user: sanitizeUser(user), token };
  },

  async login(dto: LoginDto) {
    const user = await userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedError("Credenciales inválidas");
    }
    if (!user.isActive) {
      throw new UnauthorizedError("Usuario desactivado");
    }
    const valid = await comparePassword(dto.password, user.password);
    if (!valid) {
      throw new UnauthorizedError("Credenciales inválidas");
    }
    const token = signToken({ id: user.id, email: user.email, role: user.role });
    return { user: sanitizeUser(user), token };
  },
};

// app/src/services/interfaces/IAuthService.ts
import { RegisterDto, LoginDto } from "../../dto/user.dto";

export interface AuthResult {
  user: Record<string, unknown>;
  token: string;
}

export interface IAuthService {
  register(dto: RegisterDto): Promise<AuthResult>;
  login(dto: LoginDto): Promise<AuthResult>;
}

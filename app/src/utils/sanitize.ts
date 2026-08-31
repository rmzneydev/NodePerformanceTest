// app/src/utils/sanitize.ts
import { User } from "../models/user.model";

export function sanitizeUser(user: User): Record<string, unknown> {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  };
}

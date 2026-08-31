// app/src/utils/jwt.ts

import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwt";

/**
 * Generates a signed JSON Web Token (JWT) using the configured secret
 * and expiration time.
 *
 * The secret is read from the `JWT_SECRET` environment variable.
 * If `JWT_EXPIRES_IN` is not defined, the token expires after one day.
 *
 * @param payload - Data to include in the JWT payload.
 * @returns A signed JWT string.
 *
 * @example
 * const token = signToken({
 *   userId: 1,
 *   role: "admin",
 * });
 */
export function signToken(payload: JwtPayload): string {
  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.JWT_EXPIRES_IN || "1d";

  // jsonwebtoken types are strict about expiresIn; cast via options as any
  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
}

/**
 * Verifies the signature and validity of a JSON Web Token.
 *
 * The token is verified using the secret configured in the
 * `JWT_SECRET` environment variable.
 *
 * @param token - JWT string to verify.
 * @returns The decoded JWT payload.
 * @throws {JsonWebTokenError} If the token is invalid.
 * @throws {TokenExpiredError} If the token has expired.
 *
 * @example
 * const payload = verifyToken(token);
 * console.log(payload.userId);
 */
export function verifyToken(token: string): JwtPayload {
  const secret = process.env.JWT_SECRET as string;

  return jwt.verify(token, secret) as JwtPayload;
}
// app/src/utils/hash.ts
import bcrypt from "bcrypt";

/**
 * Generates a secure hash for a password using bcrypt.
 *
 * The number of salt rounds is retrieved from the `BCRYPT_SALT_ROUNDS`
 * environment variable. If the variable is not defined, `10` is used
 * as the default value.
 *
 * @param plainPass - The password in plain text to be hashed.
 * @returns A promise that resolves to the hashed password.
 *
 * @example
 * const hashedPassword = await hashPassword("mySecurePassword");
 */
export async function hashPassword(plainPass: string): Promise<string> {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
  return bcrypt.hash(plainPass, saltRounds);
}

/**
 * Compares a plain-text password against a previously generated hash.
 *
 * Uses bcrypt to verify whether the provided password matches the
 * stored password hash.
 *
 * @param plainPass - The password in plain text to verify.
 * @param hash - The password hash to compare against.
 * @returns A promise that resolves to `true` if the password matches
 * the hash, or `false` otherwise.
 *
 * @example
 * const isValid = await comparePassword("mySecurePassword", storedHash);
 *
 * if (isValid) {
 *   console.log("Password is valid");
 * }
 */
export async function comparePassword(plainPass: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainPass, hash);
}

// app/src/dto/user.dto.ts

/**
 * Estructura base que define las propiedades comunes requeridas para un usuario.
 */
export interface UserBaseDto {
  /**
   * Nombre completo del usuario.
   */
  name: string
  /**
   * Dirección de correo electrónico del usuario.
   */
  email: string
  /**
   * Contraseña en texto plano para el usuario.
   */
  password: string
}

/**
 * DTO para la solicitud de registro de un nuevo usuario.
 * El rol es opcional: si no se envía, se asigna "manager" por defecto.
 */
export interface RegisterDto extends UserBaseDto {
  /**
   * Rol con el que se registra el usuario.
   * @default "manager"
   */
  role?: "admin" | "manager"
}

/**
 * DTO para la solicitud de inicio de sesión.
 * Contiene únicamente las credenciales de acceso necesarias.
 */
export type LoginDto = Pick<UserBaseDto, "email" | "password">

// app/src/error/AppError.ts

/**
 * Base class for custom application errors.
 *
 * Extends the native `Error` class and includes an associated
 * HTTP status code and an optional field-level validation error.
 *
 * @extends Error
 */
export class AppError extends Error {
  /**
   * HTTP status code associated with the error.
   */
  public readonly statusCode: number;

  /**
   * Optional field-level validation error details.
   */
  public readonly error?: FieldError;

  /**
   * Creates an instance of AppError.
   *
   * @param statusCode - HTTP status code, such as 400, 404, or 500.
   * @param message - Descriptive error message.
   * @param error - Optional details about the field that failed validation.
   */
  constructor(statusCode: number, message: string, error?: FieldError) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Represents a validation error associated with a specific
 * request field.
 */
export interface FieldError {
  /**
   * Name or path of the field that failed validation.
   */
  field: string;

  /**
   * Descriptive validation error message.
   */
  message: string;
}

/**
 * Error thrown when the request contains invalid syntax
 * or invalid data that cannot be processed.
 *
 * HTTP status: 400 Bad Request.
 *
 * @extends AppError
 */
export class BadRequestError extends AppError {
  /**
   * Creates a BadRequestError.
   *
   * @param message - Custom error message.
   * @param error - Optional field-level validation error details.
   * @default "Bad Request"
   */
  constructor(message = "Bad Request", error?: FieldError) {
    super(400, message, error);
  }
}

/**
 * Error thrown when authentication is required but has failed
 * or has not been provided.
 *
 * HTTP status: 401 Unauthorized.
 *
 * @extends AppError
 */
export class UnauthorizedError extends AppError {
  /**
   * Creates an UnauthorizedError.
   *
   * @param message - Custom error message.
   * @default "Unauthorized"
   */
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

/**
 * Error thrown when the client does not have the required
 * permissions to access a resource.
 *
 * HTTP status: 403 Forbidden.
 *
 * @extends AppError
 */
export class ForbiddenError extends AppError {
  /**
   * Creates a ForbiddenError.
   *
   * @param message - Custom error message.
   * @default "Forbidden"
   */
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

/**
 * Error thrown when the requested resource does not exist
 * on the server.
 *
 * HTTP status: 404 Not Found.
 *
 * @extends AppError
 */
export class NotFoundError extends AppError {
  /**
   * Creates a NotFoundError.
   *
   * @param message - Custom error message.
   * @default "Not Found"
   */
  constructor(message = "Not Found") {
    super(404, message);
  }
}

/**
 * Error thrown when the request conflicts with the current
 * state of the server, such as when attempting to create
 * a duplicate resource.
 *
 * HTTP status: 409 Conflict.
 *
 * @extends AppError
 */
export class ConflictError extends AppError {
  /**
   * Creates a ConflictError.
   *
   * @param message - Custom error message.
   * @default "Conflict"
   */
  constructor(message = "Conflict") {
    super(409, message);
  }
}

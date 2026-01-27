import type { ErrorCode } from "@/core/constants";

/**
 * * Base application error class.
 *
 * * Provides a standardized structure for application-level errors,
 * * including error codes, HTTP status codes, and optional details.
 *
 * * This class is intended to be extended by domain-specific or feature-specific errors.
 */
export abstract class AppError<
  TCode extends ErrorCode = ErrorCode,
> extends Error {
  /** Error name (defaults to the concrete class name) */
  public readonly name: string;

  /** Application-specific error code */
  public readonly code: TCode;

  /** HTTP status code associated with the error */
  public readonly statusCode: number;

  /** Optional additional error details */
  public readonly details?: Record<string, unknown>;

  /**
   * * Creates a new application error instance.
   *
   * @param message - Human-readable error message
   * @param code - Application-specific error code
   * @param statusCode - HTTP status code (defaults to 500)
   * @param details - Optional additional error context
   */
  constructor(
    message: string,
    code: TCode,
    statusCode: number = 500,
    details?: Record<string, unknown>
  ) {
    super(message);

    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;

    // Removes constructor from stack trace for cleaner error output
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * * Converts the error into a serializable API-friendly format.
   *
   * * This method is typically used to return errors from HTTP APIs.
   *
   * @returns An object containing error code, message, status code and optional details
   */
  toApiError(): {
    code: TCode;
    message: string;
    statusCode: number;
    details?: Record<string, unknown>;
  } {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      ...(this.details && { details: this.details }),
    };
  }
}

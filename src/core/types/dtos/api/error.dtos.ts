import type { ErrorCode } from "@/core/constants";

// * Represents a generic API error
// * Used for all non-successful responses
// * The message field is optional as it comes from i18n JSON files
export interface ApiErrorDto {
  // * Machine-readable error code (used as key for i18n lookup)
  readonly code: ErrorCode;

  // * Human-readable error message (resolved from i18n)
  readonly message?: string;

  // * Optional HTTP status code associated with the error
  readonly statusCode?: number;

  // * Optional additional error details
  // * Can contain any structured metadata useful for debugging
  readonly details?: Record<string, unknown>;
}

// * Represents a validation error for a specific field
// * Commonly used in form and input validation scenarios
export interface FieldErrorDto {
  // * Name of the field that failed validation
  readonly field: string;

  // * Human-readable validation error message (resolved from i18n)
  readonly message?: string;

  // * Optional machine-readable validation error code
  readonly code?: ErrorCode;
}

// * Represents an API error with a resolved message
// * Used after i18n translation has been applied
export interface ResolvedApiErrorDto extends Omit<ApiErrorDto, "message"> {
  // * Human-readable error message (required after resolution)
  readonly message: string;
}

// * Represents a field error with a resolved message
export interface ResolvedFieldErrorDto extends Omit<FieldErrorDto, "message"> {
  readonly message: string;
}

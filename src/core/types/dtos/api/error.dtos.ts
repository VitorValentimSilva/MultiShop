// * Represents a generic API error
// * Used for all non-successful responses
export interface ApiErrorDto {
  // * Machine-readable error code
  readonly code: string;

  // * Human-readable error message
  readonly message: string;

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

  // * Human-readable validation error message
  readonly message: string;

  // * Optional machine-readable validation error code
  readonly code?: string;
}

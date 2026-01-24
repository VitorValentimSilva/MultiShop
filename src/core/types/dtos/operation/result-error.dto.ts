// * Standard error interface for Result type operations
export interface ResultErrorDto {
  // * Human-readable error message
  readonly message: string;

  // * Original cause of the error (if available)
  readonly cause?: unknown;
}

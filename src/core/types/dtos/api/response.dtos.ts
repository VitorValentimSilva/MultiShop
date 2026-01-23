import { ApiErrorDto, FieldErrorDto } from "@/core/types/dtos";

// * Base structure shared by all API responses
// * Provides common metadata for tracing and debugging
interface BaseResponseDto {
  // * ISO timestamp of when the response was generated
  readonly timestamp?: string;

  // * Unique identifier for the request
  // * Useful for correlation and log tracing
  readonly requestId?: string;
}

// * Represents a successful API response
export interface ApiSuccessResponseDto<T = unknown> extends BaseResponseDto {
  // * Indicates a successful operation
  readonly success: true;

  // * Payload returned by the API
  readonly data: T;

  // * Optional success message (e.g. for user feedback)
  readonly message?: string;
}

// * Represents a generic API error response
export interface ApiErrorResponseDto extends BaseResponseDto {
  // * Indicates a failed operation
  readonly success: false;

  // * Error information describing the failure
  readonly error: ApiErrorDto;
}

// * Represents a validation error response
// * Extends the base error with field-level validation details
export interface ValidationErrorResponseDto extends BaseResponseDto {
  // * Indicates a failed operation
  readonly success: false;

  // * Error information including field validation errors
  readonly error: ApiErrorDto & {
    // * List of validation errors grouped by field
    readonly fieldErrors: readonly FieldErrorDto[];
  };
}

import { ERROR_CODES, ErrorCode } from "@/core/constants";
import {
  ApiErrorResponseDto,
  ApiSuccessResponseDto,
  FieldErrorDto,
  ValidationErrorResponseDto,
} from "@/core/types/dtos";

/**
 * Creates a standardized successful API response.
 *
 * @param data - Payload returned by the API
 * @param message - Optional human-readable success message
 * @param requestId - Optional request identifier for tracing/logging
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  requestId?: string
): ApiSuccessResponseDto<T> {
  return {
    success: true,
    data,
    message,
    // ISO timestamp indicating when the response was generated
    timestamp: new Date().toISOString(),
    requestId,
  };
}

/**
 * Creates a standardized error API response.
 *
 * @param code - Machine-readable error code
 * @param message - Human-readable error message
 * @param statusCode - HTTP status code (defaults to 500)
 * @param details - Optional extra error details for debugging
 * @param requestId - Optional request identifier for tracing/logging
 */
export function createErrorResponse(
  code: ErrorCode,
  message: string,
  statusCode: number = 500,
  details?: Record<string, unknown>,
  requestId?: string
): ApiErrorResponseDto {
  return {
    success: false,
    error: {
      code,
      message,
      statusCode,
      details,
    },
    // ISO timestamp indicating when the response was generated
    timestamp: new Date().toISOString(),
    requestId,
  };
}

/**
 * Creates a standardized validation error response.
 *
 * Used when request validation fails (e.g. invalid input fields).
 *
 * @param fieldErrors - List of field-level validation errors
 * @param message - Optional custom validation message
 * @param requestId - Optional request identifier for tracing/logging
 */
export function createValidationErrorResponse(
  fieldErrors: FieldErrorDto[],
  message: string = "Validation failed",
  requestId?: string
): ValidationErrorResponseDto {
  return {
    success: false,
    error: {
      // Fixed error code for validation-related failures
      code: ERROR_CODES.VALIDATION_FAILED,
      message,
      statusCode: 400,
      fieldErrors,
    },
    // ISO timestamp indicating when the response was generated
    timestamp: new Date().toISOString(),
    requestId,
  };
}

import type {
  ApiSuccessResponseDto,
  ApiErrorResponseDto,
  ValidationErrorResponseDto,
} from "@/core/types/dtos";

// * Unified API response type
// * Represents all possible API responses:
// * - Successful response with data
// * - Generic error response
// * - Validation error response with field-level errors
export type ApiResponse<T = unknown> =
  | ApiSuccessResponseDto<T>
  | ApiErrorResponseDto
  | ValidationErrorResponseDto;

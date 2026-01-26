export * from "@/core/constants/errors/common.errors";
export * from "@/core/constants/errors/metric.errors";
export * from "@/src/core/constants/errors/nanoid.errors";

// * Re-export all error code modules so consumers can import from a single entry point
import {
  COMMON_ERROR_CODES,
  type CommonErrorCode,
  METRIC_ERROR_CODES,
  type MetricErrorCode,
  NANOID_ERROR_CODES,
  type NanoidErrorCode,
} from "@/core/constants/errors";

/**
 * * Aggregated object containing all error codes used across the application.
 *
 * This is useful for:
 * - Centralized lookups
 * - Runtime validation
 * - Debugging and logging
 */
export const ERROR_CODES = {
  ...COMMON_ERROR_CODES,
  ...METRIC_ERROR_CODES,
  ...NANOID_ERROR_CODES,
} as const;

/**
 * * Union type of all possible error code values in the application.
 *
 * Recommended usage:
 * - Error DTOs (`code` field)
 * - Domain errors
 * - API responses
 */
export type ErrorCode = CommonErrorCode | MetricErrorCode | NanoidErrorCode;

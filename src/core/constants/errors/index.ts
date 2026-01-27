export * from "@/core/constants/errors/entities";
export * from "@/core/constants/errors/common.errors";
export * from "@/core/constants/errors/date.errors";
export * from "@/core/constants/errors/locale.errors";
export * from "@/src/core/constants/errors/nanoid.errors";
export * from "@/core/constants/errors/schema.errors";

// * Re-export all error code modules so consumers can import from a single entry point
import {
  COMMON_ERROR_CODES,
  type CommonErrorCode,
  DATE_ERROR_CODES,
  type DateErrorCode,
  DOMAIN_METRIC_ERROR_CODES,
  type DomainMetricErrorCode,
  LOCALE_ERROR_CODES,
  type LocaleErrorCode,
  NANOID_ERROR_CODES,
  type NanoidErrorCode,
  SCHEMA_ERROR_CODES,
  type SchemaErrorCode,
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
  ...DATE_ERROR_CODES,
  ...DOMAIN_METRIC_ERROR_CODES,
  ...LOCALE_ERROR_CODES,
  ...NANOID_ERROR_CODES,
  ...SCHEMA_ERROR_CODES,
} as const;

/**
 * * Union type of all possible error code values in the application.
 *
 * Recommended usage:
 * - Error DTOs (`code` field)
 * - Domain errors
 * - API responses
 */
export type ErrorCode =
  | CommonErrorCode
  | DateErrorCode
  | DomainMetricErrorCode
  | LocaleErrorCode
  | NanoidErrorCode
  | SchemaErrorCode;

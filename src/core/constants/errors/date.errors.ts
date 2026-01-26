import { createErrorCodesRaw } from "@/core/utils";

/**
 * * Error codes related to Date validation.
 * * Uses raw codes without a prefix, since they are generic and reusable.
 */
export const DATE_ERROR_CODES = createErrorCodesRaw([
  // * The provided value is not a valid date
  "DATE_INVALID",

  // * The provided date string is not in valid ISO 8601 format
  "DATE_INVALID_ISO_FORMAT",

  // * The date must be in the past
  "DATE_MUST_BE_PAST",

  // * The date must be in the future
  "DATE_MUST_BE_FUTURE",

  // * The date must be today or in the past
  "DATE_MUST_BE_PAST_OR_TODAY",

  // * The date must be today or in the future
  "DATE_MUST_BE_FUTURE_OR_TODAY",

  // * The start date must be before or equal to the end date
  "DATE_RANGE_INVALID",

  // * The date must be within a specific range
  "DATE_OUT_OF_RANGE",

  // * The date must be after a specific date
  "DATE_MUST_BE_AFTER",

  // * The date must be before a specific date
  "DATE_MUST_BE_BEFORE",
] as const);

/**
 * * Union type of all Date-related error codes.
 */
export type DateErrorCode =
  (typeof DATE_ERROR_CODES)[keyof typeof DATE_ERROR_CODES];

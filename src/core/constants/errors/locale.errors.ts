import { createErrorCodesRaw } from "@/core/utils";

/**
 * * Error codes related to Locale validation.
 * * Uses raw codes without a prefix, since they are generic and reusable.
 */
export const LOCALE_ERROR_CODES = createErrorCodesRaw([
  // * Locale code is too short
  "LOCALE_TOO_SHORT",

  // * Locale code is too long
  "LOCALE_TOO_LONG",

  // * Locale is not supported
  "LOCALE_NOT_SUPPORTED",

  // * Language code has invalid length
  "LANGUAGE_CODE_INVALID_LENGTH",

  // * Language code has invalid format
  "LANGUAGE_CODE_INVALID_FORMAT",

  // * Region code has invalid length
  "REGION_CODE_INVALID_LENGTH",

  // * Region code has invalid format
  "REGION_CODE_INVALID_FORMAT",
] as const);

/**
 * * Union type of all Locale-related error codes.
 */
export type LocaleErrorCode =
  (typeof LOCALE_ERROR_CODES)[keyof typeof LOCALE_ERROR_CODES];

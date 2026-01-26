import { createErrorCodesRaw } from "@/core/utils";

/**
 * * Error codes for common schema validations.
 * * These are generic validation errors used across multiple schemas.
 */
export const SCHEMA_ERROR_CODES = createErrorCodesRaw([
  // * UUID
  "UUID_INVALID",

  // * Email
  "EMAIL_INVALID",

  // * URL
  "URL_INVALID",

  // * Slug
  "SLUG_REQUIRED",
  "SLUG_TOO_LONG",
  "SLUG_INVALID_FORMAT",

  // * Key
  "KEY_REQUIRED",
  "KEY_TOO_LONG",
  "KEY_INVALID_FORMAT",

  // * Namespace
  "NAMESPACE_TOO_LONG",

  // * Label
  "LABEL_REQUIRED",
  "LABEL_TOO_LONG",

  // * Description
  "DESCRIPTION_TOO_LONG",

  // * Title
  "TITLE_REQUIRED",
  "TITLE_TOO_LONG",

  // * Decimal Value
  "DECIMAL_INVALID",

  // * Integer
  "INTEGER_MUST_BE_POSITIVE",
  "INTEGER_MUST_BE_NON_NEGATIVE",

  // * Percentage
  "PERCENTAGE_OUT_OF_RANGE",

  // * Currency
  "CURRENCY_CODE_INVALID_LENGTH",
  "CURRENCY_CODE_INVALID_FORMAT",
] as const);

/**
 * * Union type of all schema validation error codes.
 */
export type SchemaErrorCode =
  (typeof SCHEMA_ERROR_CODES)[keyof typeof SCHEMA_ERROR_CODES];

import { createErrorCodesRaw } from "@/core/utils";

/**
 * * Error codes related to NanoID validation.
 * * Uses raw codes without a prefix, since they are generic and reusable.
 */
export const NANOID_ERROR_CODES = createErrorCodesRaw([
  // * The provided NanoID length does not meet the expected constraints
  "NANOID_INVALID_LENGTH",

  // * The provided NanoID contains invalid or unsupported characters
  "NANOID_INVALID_CHARACTERS",
] as const);

/**
 * * Union type of all NanoID-related error codes.
 */
export type NanoidErrorCode =
  (typeof NANOID_ERROR_CODES)[keyof typeof NANOID_ERROR_CODES];

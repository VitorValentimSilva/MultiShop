import { createErrorCodesRaw } from "@/core/utils";

/**
 * * Common error codes shared across the application.
 * * Used for generic errors that are not entity-specific.
 */
export const COMMON_ERROR_CODES = createErrorCodesRaw([
  // * Authentication & Authorization
  "UNAUTHORIZED",
  "FORBIDDEN",
  "SESSION_EXPIRED",

  // * Validation
  "VALIDATION_FAILED",
  "INVALID_INPUT",
  "MISSING_REQUIRED_FIELD",

  // * Resource
  "NOT_FOUND",
  "ALREADY_EXISTS",
  "CONFLICT",

  // * Server
  "INTERNAL_ERROR",
  "SERVICE_UNAVAILABLE",
  "TIMEOUT",

  // * Rate Limiting
  "RATE_LIMIT_EXCEEDED",
] as const);

export type CommonErrorCode =
  (typeof COMMON_ERROR_CODES)[keyof typeof COMMON_ERROR_CODES];

import { nanoid } from "nanoid";
import { z } from "zod";

import {
  NANOID_DEFAULT_LENGTH,
  NANOID_ERROR_CODES,
  NANOID_PATTERN,
  NANOID_SHORT_LENGTH,
} from "@/core/constants";

/**
 * * Maps NanoID validation errors to standardized error codes.
 * * These messages are intended to be machine-readable and i18n-friendly.
 */
export const NANOID_ERROR_MESSAGES = {
  invalidLength: NANOID_ERROR_CODES.NANOID_INVALID_LENGTH,
  invalidCharacters: NANOID_ERROR_CODES.NANOID_INVALID_CHARACTERS,
} as const;

/**
 * * Zod schema for validating a standard-length NanoID.
 * * Enforces the default NanoID length and allowed character set.
 */
export const nanoidSchema = z
  .string()
  .length(NANOID_DEFAULT_LENGTH, {
    message: NANOID_ERROR_MESSAGES.invalidLength,
  })
  .regex(NANOID_PATTERN, {
    message: NANOID_ERROR_MESSAGES.invalidCharacters,
  });

/**
 * * Zod schema for validating a short NanoID.
 * * Useful for user-facing identifiers with reduced length.
 */
export const shortNanoidSchema = z
  .string()
  .length(NANOID_SHORT_LENGTH, {
    message: NANOID_ERROR_MESSAGES.invalidLength,
  })
  .regex(NANOID_PATTERN, {
    message: NANOID_ERROR_MESSAGES.invalidCharacters,
  });

/**
 * * Zod schema for a NanoID with an automatic default value.
 * * If the value is undefined, a new NanoID is generated.
 */
export const nanoidWithDefaultSchema = z
  .string()
  .length(NANOID_DEFAULT_LENGTH, {
    message: NANOID_ERROR_MESSAGES.invalidLength,
  })
  .regex(NANOID_PATTERN, {
    message: NANOID_ERROR_MESSAGES.invalidCharacters,
  })
  .default(() => nanoid());

/**
 * * Zod schema for a short NanoID with an automatic default value.
 * * Generates a NanoID using the short length when no value is provided.
 */
export const shortNanoidWithDefaultSchema = z
  .string()
  .length(NANOID_SHORT_LENGTH, {
    message: NANOID_ERROR_MESSAGES.invalidLength,
  })
  .regex(NANOID_PATTERN, {
    message: NANOID_ERROR_MESSAGES.invalidCharacters,
  })
  .default(() => nanoid(NANOID_SHORT_LENGTH));

/**
 * * Factory function to create a NanoID validation schema for a custom length.
 *
 * @param length - Expected NanoID length
 */
export function createNanoidSchema(length: number) {
  return z
    .string()
    .length(length, {
      message: NANOID_ERROR_MESSAGES.invalidLength,
    })
    .regex(NANOID_PATTERN, {
      message: NANOID_ERROR_MESSAGES.invalidCharacters,
    });
}

/**
 * * Factory function to create a NanoID schema with a generated default value.
 *
 * @param length - Length used when generating the NanoID
 */
export function createNanoidWithDefaultSchema(length: number) {
  return z
    .string()
    .length(length, {
      message: NANOID_ERROR_MESSAGES.invalidLength,
    })
    .regex(NANOID_PATTERN, {
      message: NANOID_ERROR_MESSAGES.invalidCharacters,
    })
    .default(() => nanoid(length));
}

/**
 * * Type inferred from the standard NanoID schema.
 */
export type NanoidSchemaType = z.infer<typeof nanoidSchema>;

/**
 * * Type inferred from the short NanoID schema.
 */
export type ShortNanoidSchemaType = z.infer<typeof shortNanoidSchema>;

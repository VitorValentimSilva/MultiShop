import slugify from "slugify";
import { z } from "zod";

import { SCHEMA_ERROR_CODES } from "@/core/constants";

/**
 * * Centralized schema error messages.
 * * Maps validation scenarios to domain-specific error codes.
 */
export const SCHEMA_ERROR_MESSAGES = {
  uuid: {
    invalid: SCHEMA_ERROR_CODES.UUID_INVALID,
  },
  email: {
    invalid: SCHEMA_ERROR_CODES.EMAIL_INVALID,
  },
  url: {
    invalid: SCHEMA_ERROR_CODES.URL_INVALID,
  },
  slug: {
    required: SCHEMA_ERROR_CODES.SLUG_REQUIRED,
    tooLong: SCHEMA_ERROR_CODES.SLUG_TOO_LONG,
    invalidFormat: SCHEMA_ERROR_CODES.SLUG_INVALID_FORMAT,
  },
  key: {
    required: SCHEMA_ERROR_CODES.KEY_REQUIRED,
    tooLong: SCHEMA_ERROR_CODES.KEY_TOO_LONG,
    invalidFormat: SCHEMA_ERROR_CODES.KEY_INVALID_FORMAT,
  },
  namespace: {
    tooLong: SCHEMA_ERROR_CODES.NAMESPACE_TOO_LONG,
  },
  label: {
    required: SCHEMA_ERROR_CODES.LABEL_REQUIRED,
    tooLong: SCHEMA_ERROR_CODES.LABEL_TOO_LONG,
  },
  description: {
    tooLong: SCHEMA_ERROR_CODES.DESCRIPTION_TOO_LONG,
  },
  title: {
    required: SCHEMA_ERROR_CODES.TITLE_REQUIRED,
    tooLong: SCHEMA_ERROR_CODES.TITLE_TOO_LONG,
  },
  decimal: {
    invalid: SCHEMA_ERROR_CODES.DECIMAL_INVALID,
  },
  integer: {
    mustBePositive: SCHEMA_ERROR_CODES.INTEGER_MUST_BE_POSITIVE,
    mustBeNonNegative: SCHEMA_ERROR_CODES.INTEGER_MUST_BE_NON_NEGATIVE,
  },
  percentage: {
    outOfRange: SCHEMA_ERROR_CODES.PERCENTAGE_OUT_OF_RANGE,
  },
  currency: {
    invalidLength: SCHEMA_ERROR_CODES.CURRENCY_CODE_INVALID_LENGTH,
    invalidFormat: SCHEMA_ERROR_CODES.CURRENCY_CODE_INVALID_FORMAT,
  },
} as const;

/**
 * * UUID schema with custom error message.
 */
export const uuidSchema = z.uuid({
  message: SCHEMA_ERROR_MESSAGES.uuid.invalid,
});

/**
 * * Alias for UUID schema.
 * * Semantically represents a generic entity identifier.
 */
export const idSchema = z.uuid({ message: SCHEMA_ERROR_MESSAGES.uuid.invalid });

/**
 * * Optional metadata object.
 * * Allows arbitrary key-value pairs.
 */
export const metaSchema = z.record(z.string(), z.unknown()).optional();

/**
 * * JSON schema representation for metadata.
 * * Used for OpenAPI / Swagger generation.
 */
export const metaJsonSchema = {
  type: "object" as const,
  additionalProperties: true,
  description: "Arbitrary metadata object",
};

/**
 * * Required metadata object schema.
 */
export const metaRequiredSchema = z.record(z.string(), z.unknown());

/**
 * * Email validation schema.
 */
export const emailSchema = z.email(SCHEMA_ERROR_MESSAGES.email.invalid);

/**
 * * URL validation schema.
 */
export const urlSchema = z.url(SCHEMA_ERROR_MESSAGES.url.invalid);

/**
 * * Slug schema.
 * * Enforces lowercase alphanumeric characters with hyphens.
 */
export const slugSchema = z
  .string()
  .min(1, SCHEMA_ERROR_MESSAGES.slug.required)
  .max(100, { message: SCHEMA_ERROR_MESSAGES.slug.tooLong })
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: SCHEMA_ERROR_MESSAGES.slug.invalidFormat,
  });

/**
 * * Slug schema with automatic transformation.
 * * Converts arbitrary input into a valid slug.
 */
export const slugWithTransformSchema = z
  .string()
  .min(1, SCHEMA_ERROR_MESSAGES.slug.required)
  .max(100, { message: SCHEMA_ERROR_MESSAGES.slug.tooLong })
  .transform((val) =>
    slugify(val, {
      lower: true,
      strict: true,
      trim: true,
    })
  );

/**
 * * Factory for customizable slug schemas.
 */
export function createSlugSchema(options?: {
  maxLength?: number;
  replacement?: string;
  locale?: string;
}) {
  const maxLength = options?.maxLength ?? 100;

  return z
    .string()
    .min(1, SCHEMA_ERROR_MESSAGES.slug.required)
    .max(maxLength, { message: SCHEMA_ERROR_MESSAGES.slug.tooLong })
    .transform((val) =>
      slugify(val, {
        lower: true,
        strict: true,
        trim: true,
        replacement: options?.replacement ?? "-",
        locale: options?.locale,
      })
    );
}

/**
 * * Key schema.
 * * Used for internal identifiers (snake_case).
 */
export const keySchema = z
  .string()
  .min(1, SCHEMA_ERROR_MESSAGES.key.required)
  .max(100, { message: SCHEMA_ERROR_MESSAGES.key.tooLong })
  .regex(/^[a-z0-9_]+$/, {
    message: SCHEMA_ERROR_MESSAGES.key.invalidFormat,
  });

/**
 * * Optional namespace schema.
 */
export const namespaceSchema = z
  .string()
  .max(100, { message: SCHEMA_ERROR_MESSAGES.namespace.tooLong })
  .optional();

/**
 * * Label schema.
 * * Human-readable short text.
 */
export const labelSchema = z
  .string()
  .min(1, SCHEMA_ERROR_MESSAGES.label.required)
  .max(255, { message: SCHEMA_ERROR_MESSAGES.label.tooLong });

/**
 * * Optional description schema.
 * * Used for longer explanatory text.
 */
export const descriptionSchema = z
  .string()
  .max(2000, { message: SCHEMA_ERROR_MESSAGES.description.tooLong })
  .optional();

/**
 * * Title schema.
 */
export const titleSchema = z
  .string()
  .min(1, SCHEMA_ERROR_MESSAGES.title.required)
  .max(255, { message: SCHEMA_ERROR_MESSAGES.title.tooLong });

/**
 * * Decimal value schema.
 * * Accepts either a numeric value or a numeric string.
 */
export const decimalValueSchema = z.union([
  z.string().regex(/^-?\d+(\.\d+)?$/, {
    message: SCHEMA_ERROR_MESSAGES.decimal.invalid,
  }),
  z.number(),
]);

/**
 * * Positive integer schema (>= 1).
 */
export const positiveIntSchema = z
  .number()
  .int()
  .min(1, SCHEMA_ERROR_MESSAGES.integer.mustBePositive);

/**
 * * Non-negative integer schema (>= 0).
 */
export const nonNegativeIntSchema = z
  .number()
  .int()
  .min(0, SCHEMA_ERROR_MESSAGES.integer.mustBeNonNegative);

/**
 * * Percentage schema.
 * * Valid range: 0 to 100.
 */
export const percentageSchema = z
  .number()
  .min(0, SCHEMA_ERROR_MESSAGES.percentage.outOfRange)
  .max(100, SCHEMA_ERROR_MESSAGES.percentage.outOfRange);

/**
 * * ISO 4217 currency code schema.
 */
export const currencyCodeSchema = z
  .string()
  .length(3, SCHEMA_ERROR_MESSAGES.currency.invalidLength)
  .regex(/^[A-Z]{3}$/, {
    message: SCHEMA_ERROR_MESSAGES.currency.invalidFormat,
  });

/**
 * * Schema inference types.
 */
export type UuidSchemaType = z.infer<typeof uuidSchema>;
export type IdSchemaType = z.infer<typeof idSchema>;
export type MetaSchemaType = z.infer<typeof metaSchema>;
export type MetaRequiredSchemaType = z.infer<typeof metaRequiredSchema>;
export type EmailSchemaType = z.infer<typeof emailSchema>;
export type UrlSchemaType = z.infer<typeof urlSchema>;
export type SlugSchemaType = z.infer<typeof slugSchema>;
export type KeySchemaType = z.infer<typeof keySchema>;
export type NamespaceSchemaType = z.infer<typeof namespaceSchema>;
export type LabelSchemaType = z.infer<typeof labelSchema>;
export type DescriptionSchemaType = z.infer<typeof descriptionSchema>;
export type TitleSchemaType = z.infer<typeof titleSchema>;
export type DecimalValueSchemaType = z.infer<typeof decimalValueSchema>;
export type PositiveIntSchemaType = z.infer<typeof positiveIntSchema>;
export type NonNegativeIntSchemaType = z.infer<typeof nonNegativeIntSchema>;
export type PercentageSchemaType = z.infer<typeof percentageSchema>;
export type CurrencyCodeSchemaType = z.infer<typeof currencyCodeSchema>;

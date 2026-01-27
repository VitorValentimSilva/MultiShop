import { z } from "zod";

import { LOCALE_ERROR_CODES } from "@/core/constants";

/**
 * * Centralized locale-related error messages.
 * * Maps validation scenarios to domain-specific error codes.
 */
export const LOCALE_ERROR_MESSAGES = {
  locale: {
    tooShort: LOCALE_ERROR_CODES.LOCALE_TOO_SHORT,
    tooLong: LOCALE_ERROR_CODES.LOCALE_TOO_LONG,
    notSupported: LOCALE_ERROR_CODES.LOCALE_NOT_SUPPORTED,
  },
  language: {
    invalidLength: LOCALE_ERROR_CODES.LANGUAGE_CODE_INVALID_LENGTH,
    invalidFormat: LOCALE_ERROR_CODES.LANGUAGE_CODE_INVALID_FORMAT,
  },
  region: {
    invalidLength: LOCALE_ERROR_CODES.REGION_CODE_INVALID_LENGTH,
    invalidFormat: LOCALE_ERROR_CODES.REGION_CODE_INVALID_FORMAT,
  },
} as const;

/**
 * * Locale code schema.
 * * Accepts values like "pt-BR", "en-US", etc.
 */
export const localeCodeSchema = z
  .string()
  .min(2, { message: LOCALE_ERROR_MESSAGES.locale.tooShort })
  .max(10, { message: LOCALE_ERROR_MESSAGES.locale.tooLong });

/**
 * * Supported locale schema.
 * * Restricts input to explicitly supported locales.
 */
export const supportedLocaleSchema = z.enum(["pt-BR", "en-US"], {
  message: LOCALE_ERROR_MESSAGES.locale.notSupported,
});

/**
 * * Language code schema (ISO 639-1).
 * * Example: "en", "pt".
 */
export const languageCodeSchema = z
  .string()
  .length(2, { message: LOCALE_ERROR_MESSAGES.language.invalidLength })
  .regex(/^[a-z]{2}$/, {
    message: LOCALE_ERROR_MESSAGES.language.invalidFormat,
  });

/**
 * * Region code schema (ISO 3166-1 alpha-2).
 * * Example: "US", "BR".
 */
export const regionCodeSchema = z
  .string()
  .length(2, { message: LOCALE_ERROR_MESSAGES.region.invalidLength })
  .regex(/^[A-Z]{2}$/, {
    message: LOCALE_ERROR_MESSAGES.region.invalidFormat,
  });

/**
 * * Base translation schema.
 * * Represents a persisted translation entity.
 */
export const baseTranslationSchema = z.object({
  id: z.uuid(),
  locale: localeCodeSchema,
});

/**
 * * Translation input schema.
 * * Used when creating or updating translations.
 */
export const translationInputSchema = z.object({
  locale: localeCodeSchema,
});

/**
 * * Localization options schema.
 * * Controls how localization and fallback logic behaves.
 */
export const localizationOptionsSchema = z.object({
  locale: localeCodeSchema.optional(),
  fallbackLocale: localeCodeSchema.optional(),
  includeAllTranslations: z.boolean().optional(),
  strict: z.boolean().optional(),
});

/**
 * * Schema inference types.
 */
export type LocaleCodeSchemaType = z.infer<typeof localeCodeSchema>;
export type SupportedLocaleSchemaType = z.infer<typeof supportedLocaleSchema>;
export type LanguageCodeSchemaType = z.infer<typeof languageCodeSchema>;
export type RegionCodeSchemaType = z.infer<typeof regionCodeSchema>;
export type BaseTranslationSchemaType = z.infer<typeof baseTranslationSchema>;
export type TranslationInputSchemaType = z.infer<typeof translationInputSchema>;
export type LocalizationOptionsSchemaType = z.infer<
  typeof localizationOptionsSchema
>;

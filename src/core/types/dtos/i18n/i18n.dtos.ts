import type { LocaleCode } from "@/core/types";

/**
 * * Options for translating a specific entity.
 * * `key` is the translation key used to find the text.
 * * `fallback` is used when the translation is not found.
 */
export interface UseEntityTranslationOptionsDto {
  key: string;
  fallback?: string;
}

/**
 * * Result returned by the translation hook for an entity.
 * * Includes common translation fields and metadata.
 */
export interface UseEntityTranslationResultDto {
  label: string;
  description: string | null;
  title: string | null;
  subtitle: string | null;

  // * Locale that was used to resolve the translation
  locale: LocaleCode;

  // * Indicates whether i18n initialization is complete
  isReady: boolean;
}

/**
 * * Options for pluralized translations.
 * * `count` is used by i18next to select the correct plural form.
 * * `values` is an optional object with interpolation values.
 */
export interface UsePluralTranslationOptionsDto {
  key: string;
  count: number;
  values?: Record<string, unknown>;
}

/**
 * * A single translation record (one key + its translated fields).
 * * Usually represents one entity translation (e.g. a product or category).
 */
export interface TranslationRecordDto {
  key: string;
  label: string;
  description?: string | null;
  title?: string;
  subtitle?: string | null;
}

/**
 * * Dictionary of translations for a whole entity.
 * * Each key maps to a translation record.
 */
export type EntityTranslationsDto = Record<string, TranslationRecordDto>;

/**
 * * Options for loading translations for an entity.
 * * Used for API requests or caching strategies.
 */
export interface LoadEntityTranslationsOptionsDto {
  // ? Optional tenant id for multi-tenant environments
  tenantId?: string;

  // ? Optional namespace for metric-based translations
  metricNamespace?: string;

  // ! Forces reload even if cached translations exist
  forceReload?: boolean;
}

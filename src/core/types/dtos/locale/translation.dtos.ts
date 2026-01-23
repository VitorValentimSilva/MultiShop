import type { LocaleCode } from "@/core/types";

// * Base structure for a localized translation entity
export interface BaseTranslationDto {
  // * Unique identifier of the translation
  readonly id: string;

  // * Locale associated with this translation (e.g. en-US, pt-BR)
  readonly locale: LocaleCode;
}

// * Marks an entity as translatable
// * Holds a collection of translations for different locales
export interface TranslatableDto<T extends BaseTranslationDto> {
  // * All available translations for the entity
  readonly translations: readonly T[];

  // * Optional default locale to be used as fallback
  readonly defaultLocale?: LocaleCode;
}

// * Input structure used to create or update a translation
export interface TranslationInputDto<TFields extends Record<string, unknown>> {
  // * Target locale for the translation
  readonly locale: LocaleCode;

  // * Localized fields for the given locale
  readonly fields: TFields;
}

// * Options controlling how localization should be resolved
export interface LocalizationOptionsDto {
  // * Preferred locale
  readonly locale?: LocaleCode;

  // * Locale used as fallback when translation is missing
  readonly fallbackLocale?: LocaleCode;

  // * Whether all translations should be returned
  readonly includeAllTranslations?: boolean;

  // * Enables strict mode (throws or fails when translation is missing)
  readonly strict?: boolean;
}

// * Result of a translation resolution process
export interface ResolvedTranslationDto<T extends BaseTranslationDto> {
  // * Resolved translation or null if none was found
  readonly translation: T | null;

  // * Locale that was actually used to resolve the translation
  readonly resolvedLocale: LocaleCode;

  // * Indicates whether the fallback locale was used
  readonly isFallback: boolean;

  // * List of locales that have available translations
  readonly availableLocales: readonly LocaleCode[];
}

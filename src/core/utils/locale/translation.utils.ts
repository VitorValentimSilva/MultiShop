import { DEFAULT_LOCALE, FALLBACK_LOCALE } from "@/core/constants";
import type { LocaleCode, TranslationCandidate } from "@/core/types";
import type {
  BaseTranslationDto,
  LocalizationOptionsDto,
  ResolvedTranslationDto,
} from "@/core/types/dtos";
import { getLanguageFromLocale } from "@/core/utils";

// * Finds the best translation candidate based on locale resolution rules
// * Resolution order:
// * 1. Exact locale match (e.g. pt-BR)
// * 2. Language match (e.g. pt)
// * 3. Fallback locale
// * 4. First available translation (non-strict mode)
export function findTranslationCandidate<T extends BaseTranslationDto>(
  translations: readonly T[],
  locale: LocaleCode,
  fallbackLocale: LocaleCode,
  strict: boolean
): TranslationCandidate<T> | null {
  const language = getLanguageFromLocale(locale);

  const exact = translations.find((t) => t.locale === locale);

  if (exact) {
    return { translation: exact, resolvedLocale: locale, isFallback: false };
  }

  const languageMatch = translations.find(
    (t) => getLanguageFromLocale(t.locale) === language
  );

  if (languageMatch) {
    return {
      translation: languageMatch,
      resolvedLocale: languageMatch.locale,
      isFallback: true,
    };
  }

  if (strict) return null;

  const fallback = translations.find((t) => t.locale === fallbackLocale);

  if (fallback) {
    return {
      translation: fallback,
      resolvedLocale: fallbackLocale,
      isFallback: true,
    };
  }

  return {
    translation: translations[0],
    resolvedLocale: translations[0].locale,
    isFallback: true,
  };
}

// * Resolves the best translation for the given options
// * Returns metadata about the resolution process
export function resolveTranslation<T extends BaseTranslationDto>(
  translations: readonly T[] | undefined,
  options: LocalizationOptionsDto = {}
): ResolvedTranslationDto<T> {
  const {
    locale = DEFAULT_LOCALE,
    fallbackLocale = FALLBACK_LOCALE,
    strict = false,
  } = options;

  if (!translations?.length) {
    return {
      translation: null,
      resolvedLocale: locale,
      isFallback: false,
      availableLocales: [],
    };
  }

  const availableLocales = translations.map((t) => t.locale);

  const candidate = findTranslationCandidate(
    translations,
    locale,
    fallbackLocale,
    strict
  );

  return {
    translation: candidate?.translation ?? null,
    resolvedLocale: candidate?.resolvedLocale ?? locale,
    isFallback: candidate?.isFallback ?? false,
    availableLocales,
  };
}

// * Returns only the resolved translation entity (without metadata)
export function getTranslation<T extends BaseTranslationDto>(
  translations: readonly T[] | undefined,
  locale: LocaleCode,
  fallbackLocale: LocaleCode = FALLBACK_LOCALE
): T | undefined {
  return (
    resolveTranslation(translations, { locale, fallbackLocale }).translation ??
    undefined
  );
}

// * Safely retrieves a translated field value with a default fallback
export function getTranslatedField<
  T extends BaseTranslationDto,
  K extends keyof T,
>(
  translations: readonly T[] | undefined,
  field: K,
  locale: LocaleCode,
  defaultValue: T[K]
): T[K] {
  const translation = getTranslation(translations, locale);

  return translation?.[field] ?? defaultValue;
}

// * Checks if an exact locale translation exists
export function hasExactLocale<T extends BaseTranslationDto>(
  translations: readonly T[],
  locale: LocaleCode
): boolean {
  return translations.some((t) => t.locale === locale);
}

// * Checks if a language-level translation exists (e.g. pt for pt-BR)
export function hasLanguageMatch<T extends BaseTranslationDto>(
  translations: readonly T[],
  locale: LocaleCode
): boolean {
  const language = getLanguageFromLocale(locale);

  return translations.some((t) => getLanguageFromLocale(t.locale) === language);
}

// * Checks if any translation can be resolved for the given locale
// * When exactMatch is true, disables fallback behavior
export function hasTranslation<T extends BaseTranslationDto>(
  translations: readonly T[] | undefined,
  locale: LocaleCode,
  exactMatch = false
): boolean {
  if (!translations?.length) return false;

  const result = resolveTranslation(translations, {
    locale,
    strict: exactMatch,
  });

  return result.translation !== null;
}

// * Returns all available locales for a translation set
export function getAvailableTranslationLocales<T extends BaseTranslationDto>(
  translations: readonly T[] | undefined
): readonly LocaleCode[] {
  if (!translations) return [];

  return translations.map((t) => t.locale);
}

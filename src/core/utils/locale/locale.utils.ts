import {
  DEFAULT_LOCALE,
  LANGUAGE_TO_DEFAULT_LOCALE,
  LOCALE_CACHE_MAX_SIZE,
  LOCALE_CONFIG,
  SUPPORTED_LOCALES,
} from "@/core/constants";
import type { LanguageCode, LocaleCode } from "@/core/types";
import type {
  LocaleInfoDto,
  LocaleMatchResultDto,
  ParsedLanguagePreferenceDto,
} from "@/core/types/dtos";

// * Cache for parsed Accept-Language headers to improve performance
const acceptLanguageCache = new Map<string, LocaleCode>();

// * Returns the locale configuration for a given locale code
export function getLocaleConfig(locale: LocaleCode): LocaleInfoDto {
  return LOCALE_CONFIG[locale];
}

// * Checks if a value is a supported and valid locale code
export function isValidLocale(locale: unknown): locale is LocaleCode {
  return (
    typeof locale === "string" &&
    (SUPPORTED_LOCALES as readonly string[]).includes(locale)
  );
}

// * Normalizes locale strings to the standard format (e.g. pt-br -> pt-BR)
export function normalizeLocale(locale: string): string {
  const [language, region] = locale.split(/[-_]/);

  if (!region) return language.toLowerCase();

  return `${language.toLowerCase()}-${region.toUpperCase()}`;
}

// * Ensures a valid locale, falling back to the default if invalid
export function ensureValidLocale(locale: unknown): LocaleCode {
  if (typeof locale !== "string") return DEFAULT_LOCALE;

  const normalized = normalizeLocale(locale);

  return isValidLocale(normalized) ? normalized : DEFAULT_LOCALE;
}

// * Extracts the language part from a locale string (e.g. pt from pt-BR)
export function getLanguageFromLocale(locale: string): string {
  return locale.split(/[-_]/)[0].toLowerCase();
}

// * Extracts the region part from a locale string, if present
export function getRegionFromLocale(locale: string): string | undefined {
  const parts = locale.split(/[-_]/);

  return parts.length > 1 ? parts[1].toUpperCase() : undefined;
}

// * Returns the default locale associated with a language
export function getDefaultLocaleForLanguage(language: string): LocaleCode {
  const lang = language.toLowerCase() as LanguageCode;

  return LANGUAGE_TO_DEFAULT_LOCALE[lang] ?? DEFAULT_LOCALE;
}

// * Checks for an exact locale match within available locales
export function isExactLocaleMatch(
  available: readonly LocaleCode[],
  normalized: string
): normalized is LocaleCode {
  return available.includes(normalized as LocaleCode);
}

// * Finds a locale that matches the given language
export function findLanguageLocaleMatch(
  available: readonly LocaleCode[],
  language: string
): LocaleCode | undefined {
  return available.find((l) => getLanguageFromLocale(l) === language);
}

// * Picks a fallback locale, preferring the default locale if available
export function pickFallbackLocale(
  available: readonly LocaleCode[]
): LocaleCode {
  return available.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : available[0];
}

// * Finds the best locale match for a preferred locale string
// * Match priority: exact > language > fallback
export function findBestLocaleMatch(
  preferred: string,
  available: readonly LocaleCode[] = SUPPORTED_LOCALES
): LocaleMatchResultDto {
  const normalized = normalizeLocale(preferred);

  if (isExactLocaleMatch(available, normalized)) {
    return { locale: normalized as LocaleCode, matchType: "exact", score: 1.0 };
  }

  const language = getLanguageFromLocale(normalized);
  const languageMatch = findLanguageLocaleMatch(available, language);

  if (languageMatch) {
    return { locale: languageMatch, matchType: "language", score: 0.8 };
  }

  return {
    locale: pickFallbackLocale(available),
    matchType: "fallback",
    score: 0.0,
  };
}

// * Returns only the resolved locale code
export function findBestLocale(
  preferred: string,
  available: readonly LocaleCode[] = SUPPORTED_LOCALES
): LocaleCode {
  return findBestLocaleMatch(preferred, available).locale;
}

// * Parses the Accept-Language header into ordered language preferences
export function parseAcceptLanguageHeader(
  header: string
): readonly ParsedLanguagePreferenceDto[] {
  return header
    .split(",")
    .map((part): ParsedLanguagePreferenceDto | null => {
      const trimmed = part.trim();

      if (!trimmed) return null;

      const [code, qualityPart] = trimmed.split(";");
      const quality = qualityPart?.startsWith("q=")
        ? parseFloat(qualityPart.slice(2))
        : 1.0;

      if (!code || Number.isNaN(quality)) return null;

      return { code: code.trim(), quality: Math.max(0, Math.min(1, quality)) };
    })
    .filter((item): item is ParsedLanguagePreferenceDto => item !== null)
    .sort((a, b) => b.quality - a.quality);
}

// * Chooses the better locale match based on weighted score
export function pickBetterMatch(
  current: LocaleMatchResultDto,
  candidate: LocaleMatchResultDto,
  quality: number
): LocaleMatchResultDto {
  const score = candidate.score * quality;

  return score > current.score ? { ...candidate, score } : current;
}

// * Determines if locale matching can stop early
export function shouldStopMatching(
  match: LocaleMatchResultDto,
  quality: number
): boolean {
  return match.matchType === "exact" && quality === 1.0;
}

// * Ensures the cache does not exceed its maximum size
export function ensureCacheLimit(
  cache: Map<string, LocaleCode>,
  maxSize: number
): void {
  if (cache.size < maxSize) return;

  const firstKey = cache.keys().next().value;

  if (firstKey) cache.delete(firstKey);
}

// * Resolves the best locale based on the Accept-Language header
// * Uses caching for performance
export function parseAcceptLanguage(
  acceptLanguage: string,
  available: readonly LocaleCode[] = SUPPORTED_LOCALES
): LocaleCode {
  const cacheKey = `${acceptLanguage}|${available.join(",")}`;
  const cached = acceptLanguageCache.get(cacheKey);

  if (cached) return cached;

  const preferences = parseAcceptLanguageHeader(acceptLanguage);

  let bestMatch: LocaleMatchResultDto = {
    locale: DEFAULT_LOCALE,
    matchType: "fallback",
    score: 0,
  };

  for (const { code, quality } of preferences) {
    const match = findBestLocaleMatch(code, available);

    bestMatch = pickBetterMatch(bestMatch, match, quality);

    if (shouldStopMatching(match, quality)) break;
  }

  ensureCacheLimit(acceptLanguageCache, LOCALE_CACHE_MAX_SIZE);
  acceptLanguageCache.set(cacheKey, bestMatch.locale);

  return bestMatch.locale;
}

// * Clears the Accept-Language cache
export function clearAcceptLanguageCache(): void {
  acceptLanguageCache.clear();
}

/**
 * * Returns the emoji flag based on the locale region.
 * * Example: "pt-BR" -> 🇧🇷, "en-US" -> 🇺🇸
 */
export function getLocaleFlag(locale: LocaleCode): string {
  // * Extracts the region part of the locale (e.g. "BR" from "pt-BR")
  const regionCode = locale.split("-")[1]?.toUpperCase();

  // ? If no region is present, return a generic globe icon
  if (!regionCode) return "🌐";

  // * Unicode offset used to convert ASCII letters to regional indicator symbols
  const flagOffset = 127397;

  // * Convert each character (A-Z) into its corresponding flag emoji code point
  const flag = [...regionCode]
    .map((char) => String.fromCodePoint(char.charCodeAt(0) + flagOffset))
    .join("");

  return flag;
}

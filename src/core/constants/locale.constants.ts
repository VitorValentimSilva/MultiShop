import type { LocaleCode, LanguageCode, CurrencyCode } from "@/core/types";
import type { LocaleInfoDto } from "@/core/types/dtos";

/**
 * * List of locales explicitly supported by the application.
 * * This is the authoritative source for valid locale codes.
 * ! Any locale not listed here should be considered unsupported.
 */
export const SUPPORTED_LOCALES = [
  "pt-BR",
  "en-US",
] as const satisfies readonly LocaleCode[];

/**
 * * Default locale used when no locale is provided by the user.
 * * Typically tied to the primary market of the application.
 */
export const DEFAULT_LOCALE: LocaleCode = "pt-BR";

/**
 * * Fallback locale used when the requested locale is not supported.
 * ! Should always be a safe, fully-supported locale.
 */
export const FALLBACK_LOCALE: LocaleCode = "en-US";

/**
 * * Maps a language code to its preferred default locale.
 * * Useful when only the language is known (e.g. from browser settings).
 * ? Currently most languages fall back to "en-US".
 * TODO: Add region-specific defaults if needed in the future.
 */
export const LANGUAGE_TO_DEFAULT_LOCALE: Readonly<
  Record<LanguageCode, LocaleCode>
> = {
  pt: "pt-BR",
  en: "en-US",
  es: "en-US",
  fr: "en-US",
  de: "en-US",
};

/**
 * * Maps a currency code to its most common locale.
 * * Used as a heuristic when locale is inferred from currency.
 * ! This is not always accurate for all regions using the same currency.
 */
export const CURRENCY_TO_LOCALE: Readonly<Record<CurrencyCode, LocaleCode>> = {
  BRL: "pt-BR",
  USD: "en-US",
  EUR: "en-US",
  GBP: "en-US",
  ARS: "en-US",
  MXN: "en-US",
};

/**
 * * Full configuration for each supported locale.
 * * Defines formatting rules, language metadata, and regional preferences.
 * ! Any locale added to SUPPORTED_LOCALES must be defined here.
 */
export const LOCALE_CONFIG: Readonly<Record<LocaleCode, LocaleInfoDto>> = {
  "pt-BR": {
    code: "pt-BR",

    // * Display name in English
    name: "Português (Brasil)",

    // * Display name in the native language
    nativeName: "Português",

    // * ISO language code
    language: "pt",

    // * ISO region code
    region: "BR",

    // * Text direction used for UI rendering
    direction: "ltr",

    /**
     * * Date formatting patterns by verbosity level.
     * * Intended to be consumed by date formatting utilities.
     */
    dateFormat: {
      short: "dd/MM/yy",
      medium: "dd/MM/yyyy",
      long: "d 'de' MMMM 'de' yyyy",
      full: "EEEE, d 'de' MMMM 'de' yyyy",
    },

    /**
     * * Time formatting patterns by verbosity level.
     */
    timeFormat: {
      short: "HH:mm",
      medium: "HH:mm:ss",
      long: "HH:mm:ss z",
      full: "HH:mm:ss zzzz",
    },

    // * Default currency associated with this locale
    currency: "BRL",

    /**
     * * Number formatting symbols.
     * * Used for manual or custom number formatting.
     */
    numberFormat: {
      decimal: ",",
      thousands: ".",
    },

    // * First day of the week (0 = Sunday)
    firstDayOfWeek: 0,
  },

  "en-US": {
    code: "en-US",
    name: "English (United States)",
    nativeName: "English",
    language: "en",
    region: "US",
    direction: "ltr",

    dateFormat: {
      short: "M/d/yy",
      medium: "MMM d, yyyy",
      long: "MMMM d, yyyy",
      full: "EEEE, MMMM d, yyyy",
    },

    timeFormat: {
      short: "h:mm a",
      medium: "h:mm:ss a",
      long: "h:mm:ss a z",
      full: "h:mm:ss a zzzz",
    },

    currency: "USD",

    numberFormat: {
      decimal: ".",
      thousands: ",",
    },

    firstDayOfWeek: 0,
  },
} as const;

/**
 * * Maximum number of locale entries kept in memory cache.
 * * Prevents unbounded growth when resolving locales dynamically.
 */
export const LOCALE_CACHE_MAX_SIZE = 100;

import type { DateFormatsDto, TimeFormatsDto } from "@/core/types/dtos";

// * Supported ISO language codes
export type LanguageCode = "pt" | "en" | "es" | "fr" | "de";

// * Supported ISO region/country codes
export type RegionCode = "BR" | "US" | "ES" | "PT" | "FR" | "DE" | "MX" | "AR";

// * Supported locale identifiers (language + region)
export type LocaleCode = "pt-BR" | "en-US";

// * Text reading direction
export type TextDirection = "ltr" | "rtl";

// * Available date formatting styles
// * Derived from DateFormatsDto keys
export type DateFormatStyle = keyof DateFormatsDto;

// * Available time formatting styles
// * Derived from TimeFormatsDto keys
export type TimeFormatStyle = keyof TimeFormatsDto;

// * Supported currency codes
export type CurrencyCode = "BRL" | "USD" | "EUR" | "GBP" | "ARS" | "MXN";

// * Type of locale matching result
export type LocaleMatchType = "exact" | "language" | "fallback";

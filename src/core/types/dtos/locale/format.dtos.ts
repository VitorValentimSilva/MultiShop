import type {
  LocaleCode,
  LanguageCode,
  RegionCode,
  CurrencyCode,
  TextDirection,
} from "@/core/types";

// * Defines date formatting patterns for a locale
export interface DateFormatsDto {
  // * Short date format (e.g. 01/01/25)
  readonly short: string;

  // * Medium date format (e.g. Jan 1, 2025)
  readonly medium: string;

  // * Long date format (e.g. January 1, 2025)
  readonly long: string;

  // * Full date format including weekday (e.g. Wednesday, January 1, 2025)
  readonly full: string;
}

// * Defines time formatting patterns for a locale
export interface TimeFormatsDto {
  // * Short time format (e.g. 14:30)
  readonly short: string;

  // * Medium time format (e.g. 14:30:00)
  readonly medium: string;

  // * Long time format with timezone (e.g. 14:30:00 GMT)
  readonly long: string;

  // * Full time format with verbose timezone name
  readonly full: string;
}

// * Defines numeric formatting rules for a locale
export interface NumberFormatDto {
  // * Decimal separator character (e.g. "." or ",")
  readonly decimal: string;

  // * Thousands separator character (e.g. "," or ".")
  readonly thousands: string;
}

// * Aggregates all locale-specific formatting and metadata
export interface LocaleInfoDto {
  // * Locale identifier (e.g. en-US, pt-BR)
  readonly code: LocaleCode;

  // * Locale display name in a common language
  readonly name: string;

  // * Locale name written in its native language
  readonly nativeName: string;

  // * Base language code (e.g. en, pt)
  readonly language: LanguageCode;

  // * Optional region code (e.g. US, BR)
  readonly region?: RegionCode;

  // * Text direction used by the locale (LTR or RTL)
  readonly direction: TextDirection;

  // * Date formatting rules
  readonly dateFormat: DateFormatsDto;

  // * Time formatting rules
  readonly timeFormat: TimeFormatsDto;

  // * Default currency associated with the locale (e.g. USD, BRL)
  readonly currency: CurrencyCode;

  // * Numeric formatting rules
  readonly numberFormat: NumberFormatDto;

  // * First day of the week (0 = Sunday, 1 = Monday)
  readonly firstDayOfWeek: 0 | 1;
}

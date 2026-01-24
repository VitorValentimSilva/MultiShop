import type { LocaleCode, TextDirection, LocaleMatchType } from "@/core/types";

// * Represents locale-related preferences sent by the client
export interface LocaleRequestDto {
  // * Raw Accept-Language HTTP header value
  readonly acceptLanguage?: string;

  // * Explicitly preferred locale (e.g. en-US, pt-BR)
  readonly preferredLocale?: LocaleCode;

  // * Client timezone identifier (e.g. America/Sao_Paulo)
  readonly timezone?: string;
}

// * Response returned after resolving the active locale
export interface LocaleResponseDto {
  // * Resolved locale code
  readonly locale: LocaleCode;

  // * List of all available locales
  readonly availableLocales: readonly LocaleCode[];

  // * Text direction for the resolved locale (LTR or RTL)
  readonly direction: TextDirection;
}

// * Represents the result of a locale matching operation
export interface LocaleMatchResultDto {
  // * Matched locale code
  readonly locale: LocaleCode;

  // * Type of match performed (exact, fallback, inferred)
  readonly matchType: LocaleMatchType;

  // * Match confidence score (higher is better)
  readonly score: number;
}

// * Parsed language preference extracted from Accept-Language header
export interface ParsedLanguagePreferenceDto {
  // * Language or locale code
  readonly code: string;

  // * Quality value (q-factor) indicating preference weight
  readonly quality: number;
}

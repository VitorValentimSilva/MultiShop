import * as Sentry from "@sentry/nextjs";
import { NextRequest, NextResponse } from "next/server";

import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  LOCALE_HEADER_NAME,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_EXCLUDED_PATHS,
} from "@/core/constants";
import { createLogger } from "@/core/lib";
import type { LocaleCode } from "@/core/types";
import type {
  LocaleMiddlewareOptionsDto,
  ParsedLanguagePreferenceDto,
} from "@/core/types/dtos";
import {
  isValidLocale,
  normalizeLocale,
  parseAcceptLanguageHeader,
} from "@/core/utils";

const logger = createLogger({ module: "locale-middleware" });

/**
 * * Default middleware options
 */
export const defaultOptions: LocaleMiddlewareOptionsDto = {
  redirectIfMissing: true,
  setCookie: true,
  setHeader: true,
};

/**
 * * Normalizes and filters a list of language preferences,
 * * returning only valid application locales.
 */
export function extractValidLocales(
  preferences: readonly ParsedLanguagePreferenceDto[]
): LocaleCode[] {
  return preferences
    .map(({ code }) => normalizeLocale(code)) // * Normalize locale format (e.g. en_US -> en-US)
    .filter(isValidLocale); // * Keep only supported locales
}

/**
 * * Reports an error that occurred while parsing the Accept-Language header.
 * * Logs locally and sends the error to Sentry for observability.
 */
export function reportAcceptLanguageError(header: string, error: unknown) {
  logger.warn({ header, error }, "Failed to parse Accept-Language header");

  Sentry.captureException(error, {
    extra: { header },
    tags: { module: "locale-middleware" },
  });
}

/**
 * * Safely parses the Accept-Language header.
 * * Returns an empty array if parsing fails.
 */
export function safeParseAcceptLanguage(header: string): LocaleCode[] {
  try {
    return extractValidLocales(parseAcceptLanguageHeader(header));
  } catch (error) {
    reportAcceptLanguageError(header, error);

    // ? Fail gracefully by returning no locales
    return [];
  }
}

/**
 * * Parses the Accept-Language header into valid locales.
 * * Acts as a defensive wrapper to avoid throwing errors.
 */
export function parseAcceptLanguage(header: string): LocaleCode[] {
  if (!header) return [];

  return safeParseAcceptLanguage(header);
}

/**
 * * Reads locale from request cookie (server-side, for middleware use).
 */
export function getLocaleFromRequestCookie(
  request: NextRequest
): LocaleCode | null {
  const cookie = request.cookies.get(LOCALE_COOKIE_NAME);

  if (cookie?.value && isValidLocale(cookie.value)) {
    return cookie.value;
  }

  return null;
}

/**
 * * Extracts locale from the first segment of the URL path.
 * * Example: /en/products -> "en"
 */
export function getLocaleFromPath(pathname: string): LocaleCode | null {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment;
  }

  return null;
}

/**
 * * Reads the Accept-Language header and returns the best matching locale.
 */
export function getLocaleFromHeader(request: NextRequest): LocaleCode | null {
  const acceptLanguage = request.headers.get("accept-language");

  if (acceptLanguage) {
    const locales = parseAcceptLanguage(acceptLanguage);

    return locales[0] ?? null;
  }

  return null;
}

/**
 * * Detects the best locale in the following order:
 * * 1) Path segment
 * * 2) Cookie
 * * 3) Accept-Language header
 * * 4) Default locale
 */
export function detectLocale(request: NextRequest): LocaleCode {
  const pathname = request.nextUrl.pathname;

  const pathLocale = getLocaleFromPath(pathname);

  if (pathLocale) {
    logger.debug({ locale: pathLocale, source: "path" }, "Locale detected");

    return pathLocale;
  }

  const cookieLocale = getLocaleFromRequestCookie(request);

  if (cookieLocale) {
    logger.debug({ locale: cookieLocale, source: "cookie" }, "Locale detected");

    return cookieLocale;
  }

  const headerLocale = getLocaleFromHeader(request);
  if (headerLocale) {
    logger.debug({ locale: headerLocale, source: "header" }, "Locale detected");

    return headerLocale;
  }

  logger.debug(
    { locale: DEFAULT_LOCALE, source: "default" },
    "Using default locale"
  );

  return DEFAULT_LOCALE;
}

/**
 * * Checks if the pathname is excluded from locale handling.
 */
export function isExcludedPath(pathname: string): boolean {
  return LOCALE_EXCLUDED_PATHS.some((path) => pathname.startsWith(path));
}

/**
 * * Checks if the URL already has a locale prefix.
 */
export function hasLocalePrefix(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  return (
    !!firstSegment && SUPPORTED_LOCALES.includes(firstSegment as LocaleCode)
  );
}

/**
 * * Adds a locale prefix to the path.
 * * Example: /products -> /en/products
 */
export function addLocalePrefix(pathname: string, locale: LocaleCode): string {
  return `/${locale}${pathname}`;
}

/**
 * * Removes locale prefix from the path if present.
 * * Example: /en/products -> /products
 */
export function removeLocalePrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isValidLocale(segments[0])) {
    const rest = segments.slice(1).join("/");

    return rest ? `/${rest}` : "/";
  }

  return pathname;
}

/**
 * * Creates a Next.js middleware for locale detection and routing.
 */
export function createLocaleMiddleware(
  options: LocaleMiddlewareOptionsDto = {}
) {
  const config = { ...defaultOptions, ...options };

  return function localeMiddleware(request: NextRequest): NextResponse {
    const pathname = request.nextUrl.pathname;

    // * Skip excluded paths
    if (isExcludedPath(pathname)) {
      return NextResponse.next();
    }

    // * Detect the best locale
    const locale = detectLocale(request);

    // * Check if path already has locale prefix
    const hasPrefix = hasLocalePrefix(pathname);

    // * Redirect if missing locale prefix and redirectIfMissing is true
    if (!hasPrefix && config.redirectIfMissing) {
      const newUrl = request.nextUrl.clone();

      newUrl.pathname = addLocalePrefix(pathname, locale);

      logger.info(
        { from: pathname, to: newUrl.pathname, locale },
        "Redirecting to add locale prefix"
      );

      const response = NextResponse.redirect(newUrl);

      // * Set cookie for future requests
      if (config.setCookie) {
        response.cookies.set(LOCALE_COOKIE_NAME, locale, {
          path: "/",
          maxAge: LOCALE_COOKIE_MAX_AGE,
          sameSite: "lax",
        });
      }

      return response;
    }

    // * Continue with the request
    const response = NextResponse.next();

    // * Set locale header for downstream use
    if (config.setHeader) {
      response.headers.set(LOCALE_HEADER_NAME, locale);
    }

    // * Set/update cookie (only if not already in path)
    if (config.setCookie && !hasPrefix) {
      response.cookies.set(LOCALE_COOKIE_NAME, locale, {
        path: "/",
        maxAge: LOCALE_COOKIE_MAX_AGE,
        sameSite: "lax",
      });
    }

    return response;
  };
}

/**
 * * Default middleware instance
 */
export const localeMiddleware = createLocaleMiddleware();

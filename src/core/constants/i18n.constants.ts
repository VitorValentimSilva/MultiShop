/**
 * * Centralized list of i18n namespaces used by the application.
 * * Each namespace usually maps to a separate translation file.
 * ! Keep this in sync with the translation resources structure.
 */
export const I18N_NAMESPACES = {
  // * Shared and generic translations (buttons, labels, common texts)
  common: "common",

  // * UI-specific texts (layout, navigation, component labels)
  ui: "ui",

  // * Public home page translations
  homePublic: "pages/public/home",

  // * Status pages (error, not-found, loading)
  status: "pages/status",
} as const;

/**
 * * Default namespace used when no namespace is explicitly provided.
 * * Acts as a safe fallback for most generic translations.
 */
export const DEFAULT_I18N_NAMESPACE = I18N_NAMESPACES.common;

/**
 * * Name of the cookie used to persist the user's selected locale.
 * * Commonly used by Next.js and middleware for locale resolution.
 */
export const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

/**
 * * Maximum age of the locale cookie (in seconds).
 * * Currently set to 1 year to persist user preference long-term.
 * ? Consider reducing if locale should be session-based instead.
 */
export const LOCALE_COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

/**
 * * Custom HTTP header used to explicitly pass locale information.
 * * Useful for APIs, SSR, or proxy-based locale resolution.
 * ! Should be treated as trusted only in controlled environments.
 */
export const LOCALE_HEADER_NAME = "x-locale";

/**
 * * Paths that should be excluded from locale middleware processing.
 * * These paths don't need locale prefixes (static files, API routes, etc.).
 */
export const LOCALE_EXCLUDED_PATHS = [
  "/api",
  "/_next",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.json",
  "/images",
  "/fonts",
  "/locales",
] as const;

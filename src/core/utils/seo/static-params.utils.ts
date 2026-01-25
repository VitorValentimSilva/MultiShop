import { SUPPORTED_LOCALES } from "@/core/constants";

/**
 * * Pre-computed static params for locale-based routes.
 * * Used by generateStaticParams in layouts/pages.
 * * Enables static generation for each supported locale at build time.
 */
export const LOCALE_STATIC_PARAMS = SUPPORTED_LOCALES.map((locale) => ({
  locale,
}));

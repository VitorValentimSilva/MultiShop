import type { Metadata } from "next";

import { SUPPORTED_LOCALES } from "@/core/constants";
import { LocaleCode } from "@/core/types";
import type { PageMetadataTranslationDto } from "@/core/types/dtos";

/**
 * * Builds a map of alternate language URLs for SEO.
 * * Used by Next.js metadata alternates.languages.
 */
export function generateAlternateLanguages(
  baseUrl: string
): Record<string, string> {
  const alternateLanguages: Record<string, string> = {};

  for (const locale of SUPPORTED_LOCALES) {
    alternateLanguages[locale] = `${baseUrl}/${locale}`;
  }

  return alternateLanguages;
}

/**
 * * Resolves the page title using translated metadata or a fallback value.
 */
export function resolveTitle(
  metadata: PageMetadataTranslationDto["metadata"] | undefined,
  fallback: string
): string {
  return metadata?.title ?? fallback;
}

/**
 * * Builds canonical and alternate language metadata.
 */
export function buildAlternates(baseUrl: string, locale: LocaleCode) {
  return {
    canonical: `${baseUrl}/${locale}`,
    languages: generateAlternateLanguages(baseUrl),
  };
}

/**
 * * Builds Open Graph metadata with locale awareness.
 */
export function buildOpenGraph(
  metadata: PageMetadataTranslationDto["metadata"] | undefined,
  title: string,
  description: string | undefined,
  locale: LocaleCode
) {
  return {
    title: metadata?.openGraph?.title ?? title,
    description: metadata?.openGraph?.description ?? description,
    locale,
    alternateLocale: SUPPORTED_LOCALES.filter((l) => l !== locale),
  };
}

/**
 * * Assembles the final Metadata object for the home page.
 */
export function buildHomeMetadata({
  locale,
  baseUrl,
  defaultTitle,
  metadata,
}: {
  locale: LocaleCode;
  baseUrl: string;
  defaultTitle: string;
  metadata?: PageMetadataTranslationDto["metadata"];
}): Metadata {
  const title = resolveTitle(metadata, defaultTitle);
  const description = metadata?.description;

  return {
    title,
    description,
    keywords: metadata?.keywords,
    alternates: buildAlternates(baseUrl, locale),
    openGraph: buildOpenGraph(metadata, title, description, locale),
  };
}

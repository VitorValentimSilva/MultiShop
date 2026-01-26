import type { LocaleCode } from "@/core/types";

/**
 * * Translation structure for page metadata.
 * * Used for SEO and social sharing (Open Graph).
 */
export interface PageMetadataTranslationDto {
  metadata?: {
    /** Page title */
    title?: string;

    /** Meta description */
    description?: string;

    /** SEO keywords */
    keywords?: string;

    /** Open Graph metadata */
    openGraph?: {
      title?: string;
      description?: string;
    };
  };
}

/**
 * * Options used when generating localized page metadata.
 */
export interface GenerateLocaleMetadataOptionsDto {
  /** Target locale */
  locale: LocaleCode;

  /** Base URL used to build absolute metadata URLs */
  baseUrl?: string;

  /** Fallback title when no localized title is found */
  defaultTitle?: string;
}

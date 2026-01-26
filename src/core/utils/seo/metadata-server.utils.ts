import "server-only";

import type { Metadata } from "next";

import { I18N_NAMESPACES } from "@/core/constants";
import { loadTranslationJson } from "@/core/infrastructure/i18n/i18n-server";
import type {
  GenerateLocaleMetadataOptionsDto,
  PageMetadataTranslationDto,
} from "@/core/types/dtos";
import { buildHomeMetadata } from "@/core/utils";

/**
 * * Loads translations and generates localized metadata for the home page.
 * * This function uses server-only APIs and should only be used in Server Components.
 */
export async function generateHomeMetadata({
  locale,
  baseUrl = process.env.NEXT_PUBLIC_APP_URL ??
    "https://multi-shop-vv.vercel.app",
  defaultTitle = "MultiShop",
}: GenerateLocaleMetadataOptionsDto): Promise<Metadata> {
  const translations = await loadTranslationJson<PageMetadataTranslationDto>(
    locale,
    I18N_NAMESPACES.homePublic
  );

  return buildHomeMetadata({
    locale,
    baseUrl,
    defaultTitle,
    metadata: translations.metadata,
  });
}

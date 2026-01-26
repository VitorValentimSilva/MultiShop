import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

import { LOCALE_STATIC_PARAMS, SUPPORTED_LOCALES } from "@/core/constants";
import type { LocaleCode } from "@/core/types";
import { generateHomeMetadata } from "@/core/utils/seo/metadata-server.utils";

/**
 * * Generate static params for all supported locales.
 * * This enables static generation for each locale at build time.
 */
export function generateStaticParams() {
  return LOCALE_STATIC_PARAMS;
}

/**
 * * Generate metadata with hreflang alternate links for SEO.
 * * Loads translated metadata from JSON files.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return generateHomeMetadata({ locale: locale as LocaleCode });
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale as LocaleCode)) {
    notFound();
  }

  return <>{children}</>;
}

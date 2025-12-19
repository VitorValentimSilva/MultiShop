"use client";

import { usePathname } from "next/navigation";
import {
  supportedLocales,
  Locale,
  defaultLocale,
} from "@/app/_lib/i18n/config";
import { translate } from "@/app/_lib/i18n/core";

function getLocaleFromPath(pathname: string | null): Locale {
  if (!pathname) return defaultLocale;
  const seg = pathname.split("/").filter(Boolean)[0];
  return supportedLocales.includes(seg as Locale)
    ? (seg as Locale)
    : defaultLocale;
}

export function useT() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);

  return (key: string) => translate(key, locale);
}

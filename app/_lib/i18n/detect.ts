import {
  supportedLocales,
  defaultLocale,
  Locale,
} from "@/app/_lib/i18n/config";

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return defaultLocale;

  const browserLang = navigator.language || navigator.languages?.[0] || "";

  const candidate = supportedLocales.find(
    (l) =>
      browserLang.toLowerCase() === l.toLowerCase() ||
      browserLang.toLowerCase().startsWith(l.split("-")[0].toLowerCase()),
  );

  return candidate ?? defaultLocale;
}

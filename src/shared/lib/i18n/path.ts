import { supportedLocales, Locale } from "@/app/_lib/i18n";

export function extractLocaleFromPath(pathname: string | null): Locale | null {
  if (!pathname) return null;
  const seg = pathname.split("/").filter(Boolean)[0];
  if (!seg) return null;
  return supportedLocales.includes(seg as Locale) ? (seg as Locale) : null;
}

export function replaceLocaleInPath(
  pathname: string | null,
  locale: Locale,
): string {
  if (!pathname) return `/${locale}`;

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length && supportedLocales.includes(segments[0] as Locale)) {
    segments.shift();
  }

  return `/${locale}/${segments.join("/")}`.replace(/\/$/, "") || `/${locale}`;
}

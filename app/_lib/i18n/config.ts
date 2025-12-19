export const localeOptions = [
  { label: "Português (Brasil)", value: "pt-BR" },
  { label: "English (US)", value: "en-US" },
] as const;

export type LocaleOption = (typeof localeOptions)[number];
export type Locale = LocaleOption["value"];

export const supportedLocales = localeOptions.map(
  (o) => o.value,
) as readonly Locale[];
export const defaultLocale: Locale = localeOptions[0].value;

export function extractLocaleFromPath(pathname: string | null): Locale | null {
  if (!pathname) return null;
  const seg = pathname.split("/").filter(Boolean)[0];
  if (!seg) return null;
  return supportedLocales.includes(seg as Locale) ? (seg as Locale) : null;
}

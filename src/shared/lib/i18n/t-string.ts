import { translate, Locale } from "@/app/_lib/i18n";

export function tString(key: string, locale: Locale, fallback = ""): string {
  const value = translate(key, locale);
  return typeof value === "string" ? value : fallback;
}

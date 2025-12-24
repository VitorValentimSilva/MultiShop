import "server-only";
import { Locale, translate } from "@/app/_lib/i18n";

export function tServer(key: string, locale: Locale) {
  return translate(key, locale);
}

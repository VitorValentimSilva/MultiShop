import "server-only";
import { Locale } from "@/app/_lib/i18n/config";
import { translate } from "@/app/_lib/i18n/core";

export function tServer(key: string, locale: Locale) {
  return translate(key, locale);
}

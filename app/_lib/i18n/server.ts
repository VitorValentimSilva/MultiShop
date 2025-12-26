import "server-only";
import { Locale, translate, TranslationNode } from "@/app/_lib/i18n";
import { CommonError } from "@/app/_errors";

export function tServer<T = TranslationNode>(key: string, locale: Locale): T {
  const value = translate(key, locale);

  if (value === undefined) {
    throw new CommonError("MISSING_TRANSLATION_T_SERVER", 400, { key, locale });
  }

  return value as T;
}

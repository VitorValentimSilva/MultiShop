import "server-only";
import { Locale, translate, TranslationNode } from "@/app/_lib/i18n";

export function tServer<T = TranslationNode>(key: string, locale: Locale): T {
  const value = translate(key, locale);

  if (value === undefined) {
    throw new Error(`Missing translation: ${key}`);
  }

  return value as T;
}

import { dictionaries } from "@/app/_lib/i18n/index";
import { Locale } from "@/app/_lib/i18n/config";

type TranslationNode = string | { [key: string]: TranslationNode };

export function translate(key: string, locale: Locale): string {
  const [namespace, ...path] = key.split(".");
  const dictForLocale = dictionaries[locale] as
    | Record<string, TranslationNode>
    | undefined;

  if (!dictForLocale) return key;

  const result = path.reduce<TranslationNode | undefined>((obj, part) => {
    if (obj && typeof obj === "object" && part in obj) {
      return (obj as Record<string, TranslationNode>)[part];
    }
    return undefined;
  }, dictForLocale[namespace]);

  return typeof result === "string" ? result : key;
}

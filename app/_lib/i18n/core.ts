import { dictionaries, Locale } from "@/app/_lib/i18n";

export type TranslationNode =
  | string
  | { [key: string]: TranslationNode }
  | TranslationNode[];

export function translate(
  key: string,
  locale: Locale,
): TranslationNode | undefined {
  const [namespace, ...path] = key.split(".");
  const dictForLocale = dictionaries[locale] as
    | Record<string, TranslationNode>
    | undefined;

  if (!dictForLocale) return undefined;

  return path.reduce<TranslationNode | undefined>((obj, part) => {
    if (obj && typeof obj === "object" && part in obj) {
      return (obj as Record<string, TranslationNode>)[part];
    }
    return undefined;
  }, dictForLocale[namespace]);
}

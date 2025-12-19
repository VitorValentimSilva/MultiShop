import {
  defaultLocale,
  supportedLocales,
  Locale,
} from "@/app/_lib/i18n/config";
import { detectBrowserLocale } from "@/app/_lib/i18n/detect";

const LOCALE_KEY = "locale";

export function getLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  try {
    const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (stored && supportedLocales.includes(stored)) return stored;
  } catch (error) {
    console.warn(
      "Não foi possível acessar o locale no localStorage. Erro: ",
      error,
    );
  }

  return detectBrowserLocale();
}

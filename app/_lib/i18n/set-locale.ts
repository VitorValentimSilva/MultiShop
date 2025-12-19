import { supportedLocales, Locale } from "@/app/_lib/i18n/config";

const LOCALE_KEY = "locale";

export function setLocale(locale: Locale) {
  if (!supportedLocales.includes(locale)) return;
  try {
    localStorage.setItem(LOCALE_KEY, locale);
  } catch (error) {
    console.warn(
      "Não foi possível salvar o locale no localStorage. Erro: ",
      error,
    );
  }
}

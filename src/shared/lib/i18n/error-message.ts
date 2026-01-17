import { MainError } from "@/app/_errors";
import { translate, Locale } from "@/app/_lib/i18n";

export function errorMessage(error: unknown, locale: Locale): string {
  if (!(error instanceof MainError)) {
    const fallback = translate("UNEXPECTED_ERROR", locale);
    return typeof fallback === "string" ? fallback : "Unexpected error";
  }

  const raw = translate(error.code, locale);
  const template = typeof raw === "string" ? raw : error.code;

  if (!error.params) return template;

  return Object.entries(error.params).reduce(
    (msg, [key, value]) =>
      msg.replace(
        `{${key}}`,
        Array.isArray(value) ? value.join(", ") : String(value),
      ),
    template,
  );
}

import { Locale, supportedLocales } from "@/app/_lib/i18n";
import { CommonError } from "@/app/_errors";

export function assertLocale(locale: string): asserts locale is Locale {
  if (!supportedLocales.includes(locale as Locale)) {
    throw new CommonError("INVALID_LOCALE_ASSERT_LOCALE", 400, {
      locale,
      supportedLocales,
    });
  }
}

export function parseSchema<T>(schemaName: string, parseFn: () => T): T {
  try {
    return parseFn();
  } catch (err) {
    console.error("SCHEMA_VALIDATION_FAILED_PARSE_SCHEMA", err);

    throw new CommonError("SCHEMA_VALIDATION_FAILED_PARSE_SCHEMA", 400, {
      schemaName,
    });
  }
}

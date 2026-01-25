"use client";

import { useLocale, useChangeLocale } from "@/core/infrastructure/i18n/hooks";
import { LanguageSwitcherBase } from "@/features/shared/components";

export function LanguageSwitcher() {
  const locale = useLocale();
  const changeLocale = useChangeLocale();

  return <LanguageSwitcherBase locale={locale} onChangeLocale={changeLocale} />;
}

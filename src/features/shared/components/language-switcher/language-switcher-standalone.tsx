"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import { DEFAULT_LOCALE } from "@/core/constants";
import { setLocaleCookie } from "@/core/infrastructure/i18n/client/i18n-provider";
import type { LocaleCode } from "@/core/types";
import { isValidLocale, getLocaleFromClientCookie } from "@/core/utils";
import { LanguageSwitcherBase } from "@/features/shared/components";

function subscribe(_callback: () => void) {
  return () => {};
}

export function LanguageSwitcherStandalone() {
  const router = useRouter();

  const locale = useSyncExternalStore(
    subscribe,
    getLocaleFromClientCookie,
    () => DEFAULT_LOCALE
  );

  const changeLocale = useCallback(
    (newLocale: LocaleCode) => {
      setLocaleCookie(newLocale);

      const currentPath = window.location.pathname;
      const segments = currentPath.split("/").filter(Boolean);

      if (segments[0] && isValidLocale(segments[0])) {
        segments[0] = newLocale;
      } else {
        segments.unshift(newLocale);
      }

      router.push(`/${segments.join("/")}`);
    },
    [router]
  );

  return <LanguageSwitcherBase locale={locale} onChangeLocale={changeLocale} />;
}

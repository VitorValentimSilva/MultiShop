"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import { DEFAULT_LOCALE } from "@/core/constants";
import {
  setLocaleCookie,
  buildLocaleUrl,
} from "@/core/infrastructure/i18n/client/i18n-provider";
import type { LocaleCode } from "@/core/types";
import { getLocaleFromClientCookie } from "@/core/utils";
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

      const newPath = buildLocaleUrl(window.location.pathname, newLocale);

      router.push(newPath);
      router.refresh();
    },
    [router]
  );

  return <LanguageSwitcherBase locale={locale} onChangeLocale={changeLocale} />;
}

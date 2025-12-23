"use client";

import { Globe, Check } from "lucide-react";
import { useTransition, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Button } from "@/app/_components/ui/button";

import { localeOptions, Locale } from "@/app/_lib/i18n/config";
import { getLocale } from "@/app/_lib/i18n/get-locale";
import { setLocale } from "@/app/_lib/i18n/set-locale";
import { useT } from "@/app/_lib/i18n/client";
import {
  extractLocaleFromPath,
  replaceLocaleInPath,
} from "@/app/_lib/i18n/path";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const pathLocale = extractLocaleFromPath(pathname);
  const locale = pathLocale || getLocale();
  const [, startTransition] = useTransition();
  const t = useT();

  useEffect(() => {
    if (pathLocale && pathLocale !== getLocale()) {
      setLocale(pathLocale);
    }
  }, [pathLocale]);

  function changeLanguage(lang: Locale) {
    setLocale(lang);

    const newPath = replaceLocaleInPath(pathname, lang);

    startTransition(() => {
      router.replace(newPath);
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          aria-label={t("common.lenguage.selectLanguage")}
          className="cursor-pointer"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {localeOptions.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => changeLanguage(opt.value)}
          >
            <span className="flex-1">{opt.label}</span>
            {opt.value === locale && <Check className="ml-2 h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import { Globe } from "lucide-react";

import { LOCALE_CONFIG, SUPPORTED_LOCALES } from "@/core/constants";
import { useLocale, useChangeLocale } from "@/core/infrastructure/i18n/hooks";
import type { LocaleCode } from "@/core/types";
import { getLocaleFlag } from "@/core/utils/locale";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/features/shared/components/ui";

export function LanguageSwitcher() {
  const locale = useLocale();
  const changeLocale = useChangeLocale();

  const currentLocaleConfig = LOCALE_CONFIG[locale];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Globe className="h-[1.2rem] w-[1.2rem]" />

          <span className="sr-only">
            {`Change language. Current: ${currentLocaleConfig.nativeName}`}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {SUPPORTED_LOCALES.map((localeCode) => {
          const config = LOCALE_CONFIG[localeCode as LocaleCode];
          const isActive = localeCode === locale;

          return (
            <DropdownMenuItem
              key={localeCode}
              onClick={() => changeLocale(localeCode as LocaleCode)}
              className={isActive ? "bg-accent" : ""}
            >
              <span className="mr-2">{getLocaleFlag(localeCode)}</span>

              <span>{config.nativeName}</span>

              {isActive && (
                <span className="text-muted-foreground ml-auto text-xs">✓</span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import { Globe } from "lucide-react";

import { LOCALE_CONFIG, SUPPORTED_LOCALES } from "@/core/constants";
import type { LocaleCode } from "@/core/types";
import { getLocaleFlag } from "@/core/utils";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/features/shared/components";

export interface LanguageSwitcherBaseProps {
  locale: LocaleCode;
  onChangeLocale: (locale: LocaleCode) => void;
}

export function LanguageSwitcherBase({
  locale,
  onChangeLocale,
}: LanguageSwitcherBaseProps) {
  const currentLocaleConfig = LOCALE_CONFIG[locale];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Globe className="h-[1.2rem] w-[1.2rem]" />

          <span className="sr-only">
            {`Change language. Current: ${currentLocaleConfig?.nativeName || locale}`}
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
              onClick={() => onChangeLocale(localeCode as LocaleCode)}
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

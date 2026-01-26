"use client";

import { useTranslation } from "@/core/infrastructure/i18n/hooks/use-i18n";
import { LanguageSwitcher, ModeToggle } from "@/features/shared/components";

export default function Public() {
  const { t, locale, isReady } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="flex gap-2">
        <LanguageSwitcher />
        <ModeToggle />
      </div>

      <h1 className="text-4xl font-bold">Welcome to MultiShop</h1>

      <div className="text-muted-foreground rounded-lg border p-4">
        <p>
          <strong>Current Locale:</strong> {locale}
        </p>
        <p>
          <strong>i18n Ready:</strong> {isReady ? "Yes" : "Loading..."}
        </p>
      </div>
    </div>
  );
}

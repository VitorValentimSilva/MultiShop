"use client";

import { useEffect } from "react";
import {
  defaultLocale,
  errorMessage,
  extractLocaleFromPath,
} from "@/app/_lib/i18n";
import { usePathname } from "next/navigation";

export default function ErrorPage({
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  const pathname = usePathname();
  const locale = extractLocaleFromPath(pathname) ?? defaultLocale;

  const message = errorMessage(error, locale);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-8 text-center">
      <h1 className="text-xl font-semibold">Erro</h1>
      <p className="mt-4 text-muted-foreground">{message}</p>
    </div>
  );
}

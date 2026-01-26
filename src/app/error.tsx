"use client";

import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { useEffect } from "react";
import { TriangleAlert, Home, RotateCcw } from "lucide-react";

import { I18N_NAMESPACES } from "@/core/constants";
import { useTranslation } from "@/core/infrastructure";
import {
  Badge,
  Button,
  LanguageSwitcher,
  ModeToggle,
  Separator,
  StatusPageLayout,
} from "@/features/shared/components";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const { t } = useTranslation(I18N_NAMESPACES.status);

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <StatusPageLayout>
      <div className="float-right ml-2 flex gap-2">
        <LanguageSwitcher />

        <ModeToggle />
      </div>

      <div className="flex items-start gap-4">
        <div className="bg-destructive/10 text-destructive ring-destructive/20 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1">
          <TriangleAlert className="h-6 w-6" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <h1 className="text-foreground text-lg font-semibold tracking-tight text-balance sm:text-xl">
            {t("error.title")}
          </h1>

          <p className="text-muted-foreground mt-1 text-sm text-pretty sm:text-base">
            {t("error.description")}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="button" onClick={reset} className="font-semibold">
          <RotateCcw className="size-4" />
          {t("error.tryAgain")}
        </Button>

        <Button asChild variant="outline" className="font-semibold">
          <Link href="/">
            <Home className="size-4" />
            {t("error.goHome")}
          </Link>
        </Button>

        {error?.digest ? (
          <div className="sm:ml-auto">
            <Badge variant="secondary" className="font-mono text-xs">
              {error.digest}
            </Badge>
          </div>
        ) : null}
      </div>

      {process.env.NODE_ENV !== "production" ? (
        <>
          <Separator className="my-6" />

          <details className="bg-muted/30 rounded-lg border p-3">
            <summary className="text-foreground cursor-pointer text-sm font-medium select-none">
              {t("error.technicalDetails")}
            </summary>

            <pre className="bg-background/60 text-foreground mt-3 max-h-64 overflow-auto rounded-md p-3 text-xs leading-relaxed">
              {error?.stack ?? error?.message}
            </pre>
          </details>
        </>
      ) : null}
    </StatusPageLayout>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Search, ArrowLeft } from "lucide-react";

import { useTranslation } from "@/core/infrastructure/i18n/hooks/use-i18n";
import {
  Button,
  LanguageSwitcher,
  ModeToggle,
  StatusPageLayout,
} from "@/features/shared/components";

export default function NotFound() {
  const router = useRouter();
  const { t } = useTranslation("pages/status");

  return (
    <StatusPageLayout>
      <div className="absolute top-3 right-3 flex gap-2">
        <LanguageSwitcher />

        <ModeToggle />
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="bg-muted text-muted-foreground ring-border flex h-20 w-20 items-center justify-center rounded-full ring-1">
          <Search className="h-10 w-10" aria-hidden="true" />
        </div>

        <div className="text-primary/20 mt-4 text-8xl font-bold tracking-tighter sm:text-9xl">
          {t("notFound.code")}
        </div>

        <h1 className="text-foreground -mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
          {t("notFound.title")}
        </h1>

        <p className="text-muted-foreground mt-3 max-w-md text-sm text-pretty sm:text-base">
          {t("notFound.description")}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild className="font-semibold">
          <Link href="/">
            <Home className="size-4" />
            {t("notFound.goHome")}
          </Link>
        </Button>

        <Button
          variant="outline"
          className="font-semibold"
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-4" />
          {t("notFound.goBack")}
        </Button>
      </div>
    </StatusPageLayout>
  );
}

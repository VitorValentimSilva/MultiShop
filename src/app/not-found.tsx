"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Search, ArrowLeft } from "lucide-react";
import { StatusPageLayout } from "@/features/shared/components/layouts";
import { Button } from "@/features/shared/components/ui";
import { ModeToggle } from "@/features/shared/components";

export default function NotFound() {
  const router = useRouter();

  return (
    <StatusPageLayout>
      <div className="absolute top-3 right-3">
        <ModeToggle />
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="bg-muted text-muted-foreground ring-border flex h-20 w-20 items-center justify-center rounded-full ring-1">
          <Search className="h-10 w-10" aria-hidden="true" />
        </div>

        <div className="text-primary/20 mt-4 text-8xl font-bold tracking-tighter sm:text-9xl">
          404
        </div>

        <h1 className="text-foreground -mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
          Página não encontrada
        </h1>

        <p className="text-muted-foreground mt-3 max-w-md text-sm text-pretty sm:text-base">
          Desculpe, não conseguimos encontrar a página que você está procurando.
          Ela pode ter sido movida ou não existe mais.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild className="font-semibold">
          <Link href="/">
            <Home className="size-4" />
            Ir para o início
          </Link>
        </Button>

        <Button
          variant="outline"
          className="font-semibold"
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-4" />
          Voltar
        </Button>
      </div>
    </StatusPageLayout>
  );
}

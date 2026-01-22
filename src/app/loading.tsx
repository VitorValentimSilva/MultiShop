import { StatusPageLayout } from "@/features/shared/components/layouts";
import { Spinner } from "@/features/shared/components/ui";

export default function Loading() {
  return (
    <StatusPageLayout
      maxWidth="sm"
      className="flex flex-col items-center p-8 sm:p-10"
    >
      <div className="relative">
        <div className="bg-primary/10 absolute inset-0 animate-ping rounded-full opacity-30" />

        <div className="bg-muted relative flex h-16 w-16 items-center justify-center rounded-full">
          <Spinner className="text-primary size-10" />
        </div>
      </div>

      <h1 className="text-foreground mt-6 text-lg font-semibold tracking-tight">
        Carregando...
      </h1>

      <p className="text-muted-foreground mt-2 text-center text-sm">
        Aguarde um momento enquanto preparamos tudo para você.
      </p>

      <div className="mt-6 flex gap-1">
        <span className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]" />
        <span className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]" />
        <span className="bg-primary h-2 w-2 animate-bounce rounded-full" />
      </div>
    </StatusPageLayout>
  );
}

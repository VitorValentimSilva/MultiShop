import { ReactNode } from "react";

import { cn } from "@/core/lib";

interface StatusPageLayoutProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "xl";
  className?: string;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  xl: "max-w-xl",
} as const;

function GradientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.12),transparent_45%),radial-gradient(circle_at_70%_10%,hsl(var(--ring)/0.10),transparent_40%),radial-gradient(circle_at_50%_80%,hsl(var(--muted-foreground)/0.08),transparent_50%)]"
    />
  );
}

export function StatusPageLayout({
  children,
  maxWidth = "xl",
  className,
}: StatusPageLayoutProps) {
  return (
    <main className="from-background via-background to-muted/40 relative flex min-h-dvh items-center justify-center overflow-hidden bg-linear-to-b px-4 py-12">
      <GradientBackground />

      <section
        className={cn(
          "bg-card/80 animate-in fade-in zoom-in-95 relative w-full rounded-2xl border p-6 shadow-xl backdrop-blur duration-200 sm:p-8",
          maxWidthClasses[maxWidth],
          className
        )}
      >
        {children}
      </section>
    </main>
  );
}

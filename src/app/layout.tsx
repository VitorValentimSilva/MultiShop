import "@/app/_styles/index.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/features/shared/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Multi Shop",
  description:
    "Multi Shop é uma plataforma de e-commerce multi-tenant, desenvolvida para suportar diversos tipos de vendas e categorias de produtos, permitindo que diferentes lojas utilizem a mesma infraestrutura de forma escalável e configurável.",
};

interface LocaleRootLayoutProps {
  children: ReactNode;
}

export default async function LocaleRootLayout({
  children,
}: LocaleRootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

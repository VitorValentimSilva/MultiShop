import "@/app/_styles/index.css";

import { ReactNode } from "react";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";

import {
  LOCALE_COOKIE_NAME,
  DEFAULT_LOCALE,
  LOCALE_CONFIG,
} from "@/core/constants";
import type { LocaleCode } from "@/core/types";
import { isValidLocale } from "@/core/utils";
import { I18nProvider } from "@/core/infrastructure/i18n/client/i18n-provider";
import { ThemeProvider } from "@/features/shared/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  const locale: LocaleCode =
    localeCookie && isValidLocale(localeCookie) ? localeCookie : DEFAULT_LOCALE;

  const localeConfig = LOCALE_CONFIG[locale];

  return (
    <html
      lang={locale}
      dir={localeConfig?.direction || "ltr"}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider initialLocale={locale}>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

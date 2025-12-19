import { ModeToggle } from "@/app/_components/mode-toggle";
import { LanguageSwitcher } from "@/app/_components/language-switcher";
import { Locale } from "@/app/_lib/i18n/config";
import { tServer } from "@/app/_lib/i18n/server";

interface HomeDomainProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomeDomain({ params }: HomeDomainProps) {
  const { locale } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <ModeToggle />
        <p>teste HomeDomain</p>
        <p>{tServer("tenant.notFound", locale as Locale)}</p>
        <LanguageSwitcher />
      </main>
    </div>
  );
}

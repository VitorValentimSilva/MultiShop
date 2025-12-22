import { HeroSection } from "@/app/_components/hero-section";
import { Locale } from "@/app/_lib/i18n/config";
import { tServer } from "@/app/_lib/i18n/server";

interface HomeDomainProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function HomeDomain({ params }: HomeDomainProps) {
  const { locale } = await params;

  return (
    <main className="flex-1">
      <HeroSection
        icons={[
          { type: "icon", icon: "store" },
          { type: "icon", icon: "users" },
          { type: "icon", icon: "zap" },
        ]}
        title={{
          line1: tServer("hero.title.line1", locale as Locale),
          highlight: tServer("hero.title.highlight", locale as Locale),
          line2: tServer("hero.title.line2", locale as Locale),
        }}
        description={tServer("hero.description", locale as Locale)}
        buttons={[
          {
            variant: "default",
            href: "/signup",
            icons: { type: "icon", icon: "arrow-right" },
            title: tServer("hero.buttons.primary", locale as Locale),
          },
          {
            variant: "secondary",
            href: "/learn-more",
            icons: { type: "icon", icon: "play" },
            title: tServer("hero.buttons.secondary", locale as Locale),
          },
        ]}
        stats={[
          {
            label: tServer("hero.stats.users.label", locale as Locale),
            value: tServer("hero.stats.users.value", locale as Locale),
          },
          {
            label: tServer("hero.stats.stores.label", locale as Locale),
            value: tServer("hero.stats.stores.value", locale as Locale),
          },
          {
            label: tServer("hero.stats.products.label", locale as Locale),
            value: tServer("hero.stats.products.value", locale as Locale),
          },
          {
            label: tServer("hero.stats.support.label", locale as Locale),
            value: tServer("hero.stats.support.value", locale as Locale),
          },
        ]}
      />

      <p>{tServer("tenant.notFound", locale as Locale)}</p>
    </main>
  );
}

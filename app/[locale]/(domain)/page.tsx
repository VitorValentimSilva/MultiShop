import { FeaturesGrid } from "@/app/_components/features-grid";
import { HeroSection } from "@/app/_components/hero-section";
import { HowItWorks } from "@/app/_components/howIt-works";
import { PricingSection } from "@/app/_components/pricing-section";
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

      <FeaturesGrid
        title={{
          line1: tServer("features.title.line1", locale as Locale),
          highlight: tServer("features.title.highlight", locale as Locale),
          line2: tServer("features.title.line2", locale as Locale),
        }}
        description={tServer("features.description", locale as Locale)}
        features={[
          {
            icons: { type: "icon", icon: "shield-check" },
            title: tServer("features.items.security.title", locale as Locale),
            description: tServer(
              "features.items.security.description",
              locale as Locale,
            ),
          },
          {
            icons: { type: "icon", icon: "cpu" },
            title: tServer(
              "features.items.performance.title",
              locale as Locale,
            ),
            description: tServer(
              "features.items.performance.description",
              locale as Locale,
            ),
          },
          {
            icons: { type: "icon", icon: "cog" },
            title: tServer(
              "features.items.customization.title",
              locale as Locale,
            ),
            description: tServer(
              "features.items.customization.description",
              locale as Locale,
            ),
          },
        ]}
      />

      <HowItWorks
        title={{
          line1: tServer("howItWorks.title.line1", locale as Locale),
          highlight: tServer("howItWorks.title.highlight", locale as Locale),
          line2: tServer("howItWorks.title.line2", locale as Locale),
        }}
        description={tServer("howItWorks.description", locale as Locale)}
        steps={[
          {
            number: "01",
            icon: { type: "icon", icon: "user-plus" },
            title: tServer("howItWorks.steps.step1.title", locale as Locale),
            description: tServer(
              "howItWorks.steps.step1.description",
              locale as Locale,
            ),
          },
          {
            number: "02",
            icon: { type: "icon", icon: "store" },
            title: tServer("howItWorks.steps.step2.title", locale as Locale),
            description: tServer(
              "howItWorks.steps.step2.description",
              locale as Locale,
            ),
          },
          {
            number: "03",
            icon: { type: "icon", icon: "shopping-bag" },
            title: tServer("howItWorks.steps.step3.title", locale as Locale),
            description: tServer(
              "howItWorks.steps.step3.description",
              locale as Locale,
            ),
          },
          {
            number: "04",
            icon: { type: "icon", icon: "trending-up" },
            title: tServer("howItWorks.steps.step4.title", locale as Locale),
            description: tServer(
              "howItWorks.steps.step4.description",
              locale as Locale,
            ),
          },
        ]}
      />

      <PricingSection
        title={{
          line1: tServer("pricing.title.line1", locale as Locale),
          highlight: tServer("pricing.title.highlight", locale as Locale),
          line2: tServer("pricing.title.line2", locale as Locale),
        }}
        description={tServer("pricing.description", locale as Locale)}
        typePricing={[
          {
            type: "monthly",
          },
          {
            type: "annual",
            description: tServer(
              "pricing.typePricing.annual",
              locale as Locale,
            ),
          },
        ]}
        plans={[
          {
            name: tServer("pricing.plans.basic.name", locale as Locale),
            description: tServer(
              "pricing.plans.basic.description",
              locale as Locale,
            ),
            priceMonthly: 29,
            priceAnnual: 24,
            currency: "BRL",
            features: [
              tServer(
                "pricing.plans.basic.features.feature1",
                locale as Locale,
              ),
              tServer(
                "pricing.plans.basic.features.feature2",
                locale as Locale,
              ),
              tServer(
                "pricing.plans.basic.features.feature3",
                locale as Locale,
              ),
            ],
          },
          {
            name: tServer("pricing.plans.pro.name", locale as Locale),
            description: tServer(
              "pricing.plans.pro.description",
              locale as Locale,
            ),
            priceMonthly: 59,
            priceAnnual: 49,
            currency: "BRL",
            features: [
              tServer("pricing.plans.pro.features.feature1", locale as Locale),
              tServer("pricing.plans.pro.features.feature2", locale as Locale),
              tServer("pricing.plans.pro.features.feature3", locale as Locale),
              tServer("pricing.plans.pro.features.feature4", locale as Locale),
            ],
            popular: true,
          },
        ]}
      />

      <p>{tServer("tenant.notFound", locale as Locale)}</p>
    </main>
  );
}

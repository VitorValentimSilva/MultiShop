import { CtaSection } from "@/app/_components/cta-section";
import { FeaturesGrid } from "@/app/_components/features-grid";
import { HeroSection } from "@/app/_components/hero-section";
import { HowItWorks } from "@/app/_components/howIt-works";
import { PricingSection } from "@/app/_components/pricing-section";
import { TestimonialsSection } from "@/app/_components/testimonials-section";
import { getHomeDomainContent } from "@/app/_lib/content";
import {
  featureIcons,
  pricingConfig,
  stepIcons,
  testimonialsConfig,
} from "@/app/_lib/ui/components";

interface HomeDomainProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function HomeDomain({ params }: HomeDomainProps) {
  const { locale } = await params;

  const home = getHomeDomainContent(locale);

  const {
    heroSelection,
    featuresGrid,
    howItWorks,
    pricingSection,
    testimonialsSection,
    ctaSection,
  } = await home;

  return (
    <main className="flex-1">
      <HeroSection
        title={heroSelection.title}
        description={heroSelection.description}
        domainMetrics={heroSelection.domainMetrics}
        buttons={[
          {
            variant: "default",
            href: "/signup",
            icons: { type: "icon", icon: "arrowRight" },
            title: heroSelection.buttons.primary,
          },
          {
            variant: "secondary",
            href: "/learn-more",
            icons: { type: "icon", icon: "play" },
            title: heroSelection.buttons.secondary,
          },
        ]}
        icons={[
          { type: "icon", icon: "store" },
          { type: "icon", icon: "users" },
          { type: "icon", icon: "zap" },
        ]}
      />

      <FeaturesGrid
        title={featuresGrid.title}
        description={featuresGrid.description}
        features={featuresGrid.features.map((f, i) => ({
          icons: { type: "icon", icon: featureIcons[i] },
          title: f.title,
          description: f.description,
        }))}
      />

      <HowItWorks
        title={howItWorks.title}
        description={howItWorks.description}
        steps={howItWorks.steps.map((s, i) => ({
          number: String(i + 1).padStart(2, "0"),
          icon: { type: "icon", icon: stepIcons[i] },
          title: s.title,
          description: s.description,
        }))}
      />

      <PricingSection
        title={pricingSection.title}
        description={pricingSection.description}
        typePricing={[
          { type: "monthly" },
          { type: "yearly", description: pricingSection.typePricing?.badge },
        ]}
        plans={pricingSection.plans.map((p, i) => ({
          name: p.name,
          description: p.description,
          features: p.features,
          currency: "BRL",
          priceMonthly: pricingConfig[i].priceMonthly,
          priceAnnual: pricingConfig[i].priceAnnual,
          popular: pricingConfig[i].popular,
        }))}
      />

      <TestimonialsSection
        title={testimonialsSection.title}
        description={testimonialsSection.description}
        testimonials={testimonialsSection.testimonials.map((t, i) => ({
          name: t.name,
          role: t.role,
          content: t.content,
          avatar: testimonialsConfig[i].avatar,
          rating: testimonialsConfig[i].rating,
        }))}
      />

      <CtaSection
        title={ctaSection.title}
        description={ctaSection.description}
        buttons={[
          {
            variant: "default",
            href: "/signup",
            icons: { type: "icon", icon: "arrow-right" },
            title: ctaSection.buttons.primary,
          },
          {
            variant: "secondary",
            href: "/learn-more",
            icons: { type: "icon", icon: "play" },
            title: ctaSection.buttons.secondary,
          },
        ]}
        text={ctaSection.text}
      />
    </main>
  );
}

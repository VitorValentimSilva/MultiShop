import { HomeDomainContent, HomeDomainSchema } from "@/app/_schemas/ui";
import { assertLocale, Locale, parseSchema } from "@/app/_lib/i18n";
import { tServer } from "@/app/_lib/i18n/server";

export function getHomeDomainContent(localeInput: string): HomeDomainContent {
  assertLocale(localeInput);
  const locale = localeInput as Locale;

  const heroRaw = tServer("ui.heroSelection", locale) as unknown;
  const featuresRaw = tServer("ui.featuresGrid", locale) as unknown;
  const howRaw = tServer("ui.howItWorks", locale) as unknown;
  const pricingRaw = tServer("ui.pricingSection", locale) as unknown;
  const testimonialsRaw = tServer("ui.testimonialsSection", locale) as unknown;
  const ctaRaw = tServer("ui.ctaSection", locale) as unknown;

  const homeValidated = parseSchema("home", () =>
    HomeDomainSchema.parse({
      heroSelection: heroRaw,
      featuresGrid: featuresRaw,
      howItWorks: howRaw,
      pricingSection: pricingRaw,
      testimonialsSection: testimonialsRaw,
      ctaSection: ctaRaw,
    }),
  );

  return homeValidated;
}

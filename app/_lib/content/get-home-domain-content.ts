import { HomeDomainContent, HomeDomainSchema } from "@/app/_schemas/ui";
import { assertLocale, Locale, parseSchema } from "@/app/_lib/i18n";
import { tServer } from "@/app/_lib/i18n/server";
import {
  featureIcons,
  pricingConfig,
  stepIcons,
  testimonialsConfig,
} from "@/app/_lib/ui/components";
import { UiError } from "@/app/_errors";

export function validateHomeUiConsistency(home: HomeDomainContent) {
  if (home.featuresGrid.features.length !== featureIcons.length) {
    throw new UiError("HOME_DOMAIN_FEATURES_MATCH_ICONS_VALIDATION");
  }

  if (home.howItWorks.steps.length !== stepIcons.length) {
    throw new UiError("HOME_DOMAIN_HOW_IT_WORKS_MATCH_ICONS_VALIDATION");
  }

  if (home.pricingSection.plans.length !== pricingConfig.length) {
    throw new UiError("HOME_DOMAIN_PRICING_MATCH_CONFIG_VALIDATION");
  }

  if (
    home.testimonialsSection.testimonials.length !== testimonialsConfig.length
  ) {
    throw new UiError("HOME_DOMAIN_TESTIMONIALS_MATCH_CONFIG_VALIDATION");
  }
}

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

  validateHomeUiConsistency(homeValidated);

  return homeValidated;
}

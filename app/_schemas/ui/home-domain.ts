import { z } from "zod";

export const StatSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const HeroSchema = z.object({
  title: z.object({
    line1: z.string(),
    highlight: z.string(),
    line2: z.string(),
  }),
  description: z.string(),
  buttons: z.object({
    primary: z.string(),
    secondary: z.string(),
  }),
  stats: z.array(StatSchema),
});

export const FeatureItemSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const FeaturesGridSchema = z.object({
  title: z.object({
    line1: z.string(),
    highlight: z.string(),
    line2: z.string(),
  }),
  description: z.string(),
  features: z.array(FeatureItemSchema),
});

export const StepItemSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const HowItWorksSchema = z.object({
  title: z.object({
    line1: z.string(),
    highlight: z.string(),
    line2: z.string(),
  }),
  description: z.string(),
  steps: z.array(StepItemSchema),
});

export const PricingPlanSchema = z.object({
  name: z.string(),
  description: z.string(),
  features: z.array(z.string()),
});

export const PricingSectionSchema = z.object({
  title: z.object({
    line1: z.string(),
    highlight: z.string(),
    line2: z.string(),
  }),
  description: z.string(),
  typePricing: z
    .object({
      badge: z.string().optional(),
    })
    .optional(),
  plans: z.array(PricingPlanSchema),
});

export const TestimonialSchema = z.object({
  name: z.string(),
  role: z.string(),
  content: z.string(),
});

export const TestimonialsSectionSchema = z.object({
  title: z.object({
    line1: z.string(),
    highlight: z.string(),
    line2: z.string(),
  }),
  description: z.string(),
  testimonials: z.array(TestimonialSchema),
});

export const CtaSectionSchema = z.object({
  title: z.object({
    line1: z.string(),
    highlight: z.string(),
    line2: z.string(),
  }),
  description: z.string(),
  buttons: z.object({
    primary: z.string(),
    secondary: z.string(),
  }),
  text: z.string(),
});

export const HomeDomainSchema = z.object({
  heroSelection: HeroSchema,
  featuresGrid: FeaturesGridSchema,
  howItWorks: HowItWorksSchema,
  pricingSection: PricingSectionSchema,
  testimonialsSection: TestimonialsSectionSchema,
  ctaSection: CtaSectionSchema,
});

export type HomeDomainContent = z.infer<typeof HomeDomainSchema>;

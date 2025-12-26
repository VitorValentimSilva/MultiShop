export const featureIcons = [
  "shield-check",
  "cpu",
  "cog",
  "clipboard-list",
  "color-swatch",
  "cloud",
  "chart-bar",
  "template",
  "sparkles",
] as const;

export const stepIcons = [
  "user-plus",
  "store",
  "shopping-bag",
  "trending-up",
] as const;

export const pricingConfig = [
  { priceMonthly: 29, priceAnnual: 24, popular: false },
  { priceMonthly: 59, priceAnnual: 49, popular: true },
  { priceMonthly: 99, priceAnnual: 79, popular: false },
] as const;

export const testimonialsConfig = [
  { avatar: "MS", rating: 5 },
  { avatar: "CE", rating: 4 },
  { avatar: "AP", rating: 5 },
  { avatar: "RM", rating: 5 },
  { avatar: "JF", rating: 5 },
  { avatar: "LO", rating: 5 },
] as const;

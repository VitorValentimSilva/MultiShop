import { TitleProps } from "@/app/_types/ui";

export type TypePricingProps = {
  type: "monthly" | "yearly";
  description?: string;
};

export type PlansProps = {
  name: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  currency: string;
  features: string[];
  popular?: boolean;
};

export type PricingSectionProps = {
  title: TitleProps;
  description: string;
  typePricing: TypePricingProps[];
  plans: PlansProps[];
};

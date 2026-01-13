import { TitleProps, IconProps, ButtonProps } from "@/app/_types/ui";
import { GetAllDomainMetricResult } from "@/app/_types/dto/domain-metric";

export type ButtonHeroSectionProps = ButtonProps & {
  icons: IconProps;
  href: string;
};

export type HeroSectionProps = {
  icons?: IconProps[];
  title: TitleProps;
  description: string;
  buttons: ButtonHeroSectionProps[];
  domainMetrics?: GetAllDomainMetricResult[];
};

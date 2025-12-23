import {
  TitleProps,
  IconProps,
  ButtonProps,
  LabeledValueProps,
} from "@/app/_types/ui";

export type ButtonHeroSectionProps = ButtonProps & {
  icons: IconProps;
  href: string;
};

export type HeroSectionProps = {
  icons?: IconProps[];
  title: TitleProps;
  description: string;
  buttons: ButtonHeroSectionProps[];
  stats?: LabeledValueProps[];
};

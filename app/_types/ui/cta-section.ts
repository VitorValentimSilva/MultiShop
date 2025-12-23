import { ButtonProps, IconProps, TitleProps } from "@/app/_types/ui";

export type ButtonHCtaSectionProps = ButtonProps & {
  icons: IconProps;
  href: string;
};

export type CtaSectionProps = {
  title: TitleProps;
  description: string;
  buttons: ButtonHCtaSectionProps[];
  text: string;
};

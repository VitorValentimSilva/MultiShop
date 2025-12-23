import {
  ButtonProps,
  IconProps,
  ImageProps,
  LabeledValueProps,
  TitleProps,
} from "@/app/_types/ui";

export type HeaderTitleProps = TitleProps &
  (IconProps | ImageProps) & {
    href: string;
  };

export interface HeaderProps {
  title: HeaderTitleProps;
  navLinks: LabeledValueProps[];
  buttons: ButtonProps[];
}

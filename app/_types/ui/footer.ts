import {
  IconProps,
  ImageProps,
  LabeledValueProps,
  TitleProps,
} from "@/app/_types/ui";

export type FooterTitleProps = TitleProps &
  (IconProps | ImageProps) & {
    href: string;
  };

export type SocialLinkProps = IconProps &
  LabeledValueProps & {
    href?: string;
  };

export type FooterLinksProps = {
  name: string;
  links: LabeledValueProps[];
};

export type FooterProps = {
  title: FooterTitleProps;
  description: string;
  socialLinks: SocialLinkProps[];
  footerLinks: FooterLinksProps[];
  contacts: SocialLinkProps[];
  text: TitleProps;
};

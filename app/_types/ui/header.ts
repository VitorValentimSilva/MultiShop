import { headerIcons } from "@/app/_lib/ui";

export type HeaderTitleIcon = {
  type: "icon";
  icon: keyof typeof headerIcons;
};

export type HeaderTitleImage = {
  type: "image";
  src: string;
  alt: string;
};

export type HeaderTitle = {
  text: string;
  text2?: string;
  href: string;
} & (HeaderTitleIcon | HeaderTitleImage);

export type NavLink = {
  href: string;
  label: string;
};

export type ButtonProps = {
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "icon" | "default" | "sm" | "lg" | "icon-sm" | "icon-lg";
  title: string;
};

export interface HeaderProps {
  title: HeaderTitle;
  navLinks: NavLink[];
  button: ButtonProps[];
}

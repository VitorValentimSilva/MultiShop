import { icons } from "@/app/_lib/ui";

export type IconProps = {
  type: "icon";
  icon: keyof typeof icons;
};

export type ImageProps = {
  type: "image";
  src: string;
  alt: string;
};

export type LabeledValueProps = {
  label: string;
  value: string;
};

export type TitleProps = {
  line1: string;
  highlight?: string;
  line2?: string;
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

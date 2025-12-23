import { IconProps, TitleProps } from "@/app/_types/ui";

export type FeaturesProps = {
  title: string;
  description: string;
  icons: IconProps;
};

export type FeatureGridProps = {
  title: TitleProps;
  description: string;
  features: FeaturesProps[];
};

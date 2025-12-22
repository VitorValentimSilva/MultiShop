import { IconProps, TitleProps } from "@/app/_types/ui";

export type StepsProps = {
  number: string;
  icon: IconProps;
  title: string;
  description: string;
};

export type HowltItWorksStepProps = {
  title: TitleProps;
  description: string;
  steps: StepsProps[];
};

import { TitleProps } from "./main";

export type TestimonialProps = {
  avatar: string;
  name: string;
  role: string;
  content: string;
  rating: number;
};

export type TestimonialsSectionProps = {
  title: TitleProps;
  description: string;
  testimonials: TestimonialProps[];
};

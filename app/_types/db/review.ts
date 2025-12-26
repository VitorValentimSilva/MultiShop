import { Plan } from "@/app/_types/db";

export interface Review {
  id: string;
  rating: number;
  title?: string;
  message?: string;
  authorName?: string;
  authorEmail?: string;
  isPublished: boolean;
  planId?: Plan["id"];
  plan?: Plan;
  createdAt?: Date;
  updatedAt?: Date;
}

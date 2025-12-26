import { Plan } from "@/app/_types/db";

export interface Review {
  id: string;
  rating: number;
  title?: string | null;
  message?: string | null;
  authorName?: string | null;
  authorEmail?: string | null;
  isPublished: boolean;
  planId?: Plan["id"] | null;
  plan?: Plan | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

import { Plan } from "@/app/_types/db";

export interface PlanTranslation {
  id: string;
  locale: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  planId: Plan["id"];
  plan: Plan;
}

export interface PlanTranslationWithoutRelations {
  id: string;
  locale: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  planId: Plan["id"];
}

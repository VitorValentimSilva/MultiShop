import { Plan } from "@/app/_types/db";

export interface PlanPrice {
  id: string;
  planId: Plan["id"];
  amountCents: number;
  currency: string;
  interval: "MONTH" | "YEAR" | "ONE_TIME";
  stripePriceId?: string | null;
  active: boolean;
  plan: Plan;
}

export interface PlanPriceWithoutRelations {
  id: string;
  planId: Plan["id"];
  amountCents: number;
  currency: string;
  interval: "MONTH" | "YEAR" | "ONE_TIME";
  stripePriceId?: string | null;
  active: boolean;
}

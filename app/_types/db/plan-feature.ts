import { Feature, Plan } from "@/app/_types/db";

export interface PlanFeature {
  planId: Plan["id"];
  featureId: Feature["id"];
  included: boolean;
  note?: string | null;
  limitValue?: number | null;
  limitUnit?: string | null;
  plan: Plan;
  feature: Feature;
}

export interface PlanFeatureWithoutRelations {
  planId: Plan["id"];
  featureId: Feature["id"];
  included: boolean;
  note?: string | null;
  limitValue?: number | null;
  limitUnit?: string | null;
}

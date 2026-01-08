import { PlanFeature } from "@/app/_types/db";

export interface Feature {
  id: string;
  key: string;
  name: string;
  description?: string | null;
  order?: number | null;
  plans: PlanFeature[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface FeatureWithoutRelations {
  id: string;
  key: string;
  name: string;
  description?: string | null;
  order?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

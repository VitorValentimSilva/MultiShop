import { PlanFeature } from "@/app/_types/db";

export interface Feature {
  id: string;
  key: string;
  name: string;
  description?: string;
  order?: number;
  plans: PlanFeature[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FeatureWithoutRelations {
  id: string;
  key: string;
  name: string;
  description?: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

import { PlanFeature, FeatureTranslation } from "@/app/_types/db";

export interface Feature {
  id: string;
  key: string;
  order?: number | null;
  translations: FeatureTranslation[];
  planFeatures: PlanFeature[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface FeatureWithoutRelations {
  id: string;
  key: string;
  order?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

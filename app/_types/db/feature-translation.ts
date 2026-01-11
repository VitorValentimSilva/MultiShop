import { Feature } from "@/app/_types/db";

export interface FeatureTranslation {
  id: string;
  locale: string;
  title: string;
  description?: string | null;
  featureId: Feature["id"];
  feature: Feature;
}

export interface FeatureTranslationWithoutRelations {
  id: string;
  locale: string;
  title: string;
  description?: string | null;
  featureId: Feature["id"];
}

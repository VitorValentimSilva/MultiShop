import { DomainMetric } from "@/app/_types/db";

export interface DomainMetricTranslation {
  id: string;
  locale: string;
  label: string;
  description?: string | null;
  metricId: DomainMetric["id"];
  metric: DomainMetric;
}

export interface DomainMetricTranslationResponse {
  id: string;
  locale: string;
  label: string;
  description?: string | null;
  metricId: DomainMetric["id"];
}

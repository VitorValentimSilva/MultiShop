import { DomainMetric, DomainMetricTranslation } from "@/app/_types/db";

export interface GetAllDomainMetricInput {
  locale: string;
}

export interface GetAllDomainMetricResult {
  id: DomainMetric["id"];
  key: DomainMetric["key"];
  namespace?: DomainMetric["namespace"] | null;
  value: DomainMetric["value"];
  unit?: DomainMetric["unit"] | null;
  meta?: DomainMetric["meta"] | null;
  label: DomainMetricTranslation["label"];
  description?: DomainMetricTranslation["description"] | null;
}

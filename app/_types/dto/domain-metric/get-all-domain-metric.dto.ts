import { DomainMetric, DomainMetricTranslation } from "@/app/_types/db";
import { PaginationInput, PaginatedResponse } from "@/app/_types/api";

export interface GetAllDomainMetricInput extends Partial<PaginationInput> {
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

export type GetAllDomainMetricResponse =
  | GetAllDomainMetricResult[]
  | PaginatedResponse<GetAllDomainMetricResult>;

export interface FetchGetAllDomainMetricOptions {
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface FetchGetAllDomainMetricInput {
  locale: string;
  options?: FetchGetAllDomainMetricOptions;
}

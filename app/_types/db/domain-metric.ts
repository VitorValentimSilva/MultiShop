import { DomainMetricTranslation } from "@/app/_types/db";

export interface DomainMetric {
  id: string;
  key: string;
  namespace?: string | null;
  value: number;
  unit?: string | null;
  meta?: Record<string, unknown> | null;
  translations: DomainMetricTranslation[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface DomainMetricWithoutRelations {
  id: string;
  key: string;
  namespace?: string | null;
  value: number;
  unit?: string | null;
  meta?: Record<string, unknown> | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

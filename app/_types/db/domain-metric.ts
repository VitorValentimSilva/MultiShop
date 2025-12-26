export interface DomainMetric {
  id: string;
  key: string;
  namespace?: string;
  value: number;
  unit?: string;
  meta?: JSON;
  createdAt?: Date;
}

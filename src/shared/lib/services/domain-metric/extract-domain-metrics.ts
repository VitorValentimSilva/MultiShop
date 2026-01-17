import {
  GetAllDomainMetricResult,
  GetAllDomainMetricResponse,
} from "@/app/_types/dto/domain-metric";

export function extractDomainMetricsFromResponse(
  data: GetAllDomainMetricResponse,
): GetAllDomainMetricResult[] {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && "data" in data) {
    return data.data;
  }

  return [];
}

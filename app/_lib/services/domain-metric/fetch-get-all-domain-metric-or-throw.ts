import { GetAllDomainMetricResult } from "@/app/_types/dto/domain-metric";
import { getAllDomainMetric } from "@/app/_actions/domain-metric";
import { UiError } from "@/app/_errors";

export async function fetchGetAllDomainMetricOrThrow(
  locale: string,
): Promise<GetAllDomainMetricResult[]> {
  const result = await getAllDomainMetric({ locale });

  if (result && "success" in result && result.success) {
    return result.data ?? [];
  }

  throw new UiError("FETCH_GET_ALL_DOMAIN_METRIC_OR_THROW_FAILED");
}

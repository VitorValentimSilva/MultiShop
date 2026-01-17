import {
  FetchGetAllDomainMetricInput,
  GetAllDomainMetricResult,
} from "@/app/_types/dto/domain-metric";
import { getAllDomainMetric } from "@/app/_actions/domain-metric";
import { UiError } from "@/app/_errors";
import {
  extractDomainMetricsFromResponse,
  buildGetAllDomainMetricInput,
} from "@/app/_lib/services/domain-metric";

export async function fetchGetAllDomainMetricOrThrow(
  input: FetchGetAllDomainMetricInput,
): Promise<GetAllDomainMetricResult[]> {
  const resultBuild = buildGetAllDomainMetricInput(input);
  const resultGetAllDomainMetric = await getAllDomainMetric(resultBuild);

  if (
    resultGetAllDomainMetric &&
    "success" in resultGetAllDomainMetric &&
    resultGetAllDomainMetric.success
  ) {
    return extractDomainMetricsFromResponse(resultGetAllDomainMetric.data);
  }

  throw new UiError("FETCH_GET_ALL_DOMAIN_METRIC_OR_THROW_FAILED");
}

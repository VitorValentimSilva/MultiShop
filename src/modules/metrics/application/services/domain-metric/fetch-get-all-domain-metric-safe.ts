import {
  GetAllDomainMetricResult,
  FetchGetAllDomainMetricInput,
} from "@/app/_types/dto/domain-metric";
import { getAllDomainMetric } from "@/app/_actions/domain-metric";
import {
  extractDomainMetricsFromResponse,
  buildGetAllDomainMetricInput,
} from "@/app/_lib/services/domain-metric";

export async function fetchGetAllDomainMetricSafe(
  input: FetchGetAllDomainMetricInput,
): Promise<GetAllDomainMetricResult[]> {
  try {
    const resultBuild = buildGetAllDomainMetricInput(input);
    const resultGetAllDomainMetric = await getAllDomainMetric(resultBuild);

    if (
      resultGetAllDomainMetric &&
      "success" in resultGetAllDomainMetric &&
      resultGetAllDomainMetric.success
    ) {
      return extractDomainMetricsFromResponse(resultGetAllDomainMetric.data);
    }

    console.error(
      "fetchGetAllDomainMetricSafe: getAllDomainMetric returned failure:",
      resultGetAllDomainMetric,
    );

    return [];
  } catch (err) {
    console.error("fetchGetAllDomainMetricSafe: unexpected error", err);

    return [];
  }
}

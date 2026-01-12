import { GetAllDomainMetricResult } from "@/app/_types/dto/domain-metric";
import { getAllDomainMetric } from "@/app/_actions/domain-metric";

export async function fetchGetAllDomainMetricSafe(
  locale: string,
): Promise<GetAllDomainMetricResult[]> {
  try {
    const result = await getAllDomainMetric({ locale });

    if (result && "success" in result && result.success) {
      return result.data ?? [];
    }

    console.error(
      "fetchGetAllDomainMetricSafe: getAllDomainMetric returned failure:",
      result,
    );

    return [];
  } catch (err) {
    console.error("fetchGetAllDomainMetricSafe: unexpected error", err);

    return [];
  }
}

import {
  FetchGetAllDomainMetricInput,
  GetAllDomainMetricInput,
} from "@/app/_types/dto/domain-metric";

export function buildGetAllDomainMetricInput(
  input: FetchGetAllDomainMetricInput,
): GetAllDomainMetricInput {
  return {
    locale: input.locale,
    ...(input.options?.limit && { limit: input.options.limit, page: 1 }),
    ...(input.options?.sortBy && { sortBy: input.options.sortBy }),
    ...(input.options?.sortOrder && { sortOrder: input.options.sortOrder }),
  };
}

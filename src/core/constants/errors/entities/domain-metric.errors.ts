import { createErrorCodes } from "@/core/utils";

export const DOMAIN_METRIC_ERROR_CODES = createErrorCodes(
  ["UNIT_LENGTH_EXCEEDED"] as const,
  "DOMAIN_METRIC"
);

export type DomainMetricErrorCode =
  (typeof DOMAIN_METRIC_ERROR_CODES)[keyof typeof DOMAIN_METRIC_ERROR_CODES];

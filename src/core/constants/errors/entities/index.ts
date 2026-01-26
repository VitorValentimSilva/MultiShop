export * from "@/core/constants/errors/entities/domain-metric.errors";

import {
  DOMAIN_METRIC_ERROR_CODES,
  type DomainMetricErrorCode,
} from "@/core/constants/errors";

export const ERROR_CODES = {
  ...DOMAIN_METRIC_ERROR_CODES,
} as const;

export type ErrorCode = DomainMetricErrorCode;

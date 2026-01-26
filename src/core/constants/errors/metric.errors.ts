import { createErrorCodes } from "@/core/utils";

/**
 * * Error codes for Metric entity operations.
 */
export const METRIC_ERROR_CODES = createErrorCodes(
  [
    // * Metric Management
    "NOT_FOUND",
    "ALREADY_EXISTS",
    "DISABLED",

    // * Data
    "INVALID_VALUE",
    "INVALID_TYPE",
    "DATA_CORRUPTED",

    // * Translation
    "TRANSLATION_NOT_FOUND",
    "TRANSLATION_ALREADY_EXISTS",
  ] as const,
  "METRIC"
);

export type MetricErrorCode =
  (typeof METRIC_ERROR_CODES)[keyof typeof METRIC_ERROR_CODES];

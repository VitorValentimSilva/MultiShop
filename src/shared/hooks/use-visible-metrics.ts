import { useMemo } from "react";
import {
  UseVisibleMetricsConfig,
  UseVisibleMetricsReturn,
} from "@/app/_types/ui";
import { DEFAULT_METRICS_LIMITS } from "@/app/_lib/constants/domain-metric";

export function useVisibleMetrics<T>(
  metrics: T[] | undefined,
  showAll: boolean,
  config: UseVisibleMetricsConfig = {},
): UseVisibleMetricsReturn<T> {
  const {
    mobileLimit = DEFAULT_METRICS_LIMITS.mobile,
    desktopLimit = DEFAULT_METRICS_LIMITS.desktop,
  } = config;

  return useMemo(() => {
    if (!metrics || metrics.length === 0) {
      return {
        visibleMetricsDesktop: [],
        visibleMetricsMobile: [],
        shouldShowButton: false,
        hasMoreThanMobileLimit: false,
        hasMoreThanDesktopLimit: false,
        totalCount: 0,
      };
    }

    const totalCount = metrics.length;
    const hasMoreThanMobileLimit = totalCount > mobileLimit;
    const hasMoreThanDesktopLimit = totalCount > desktopLimit;

    return {
      visibleMetricsDesktop: showAll ? metrics : metrics.slice(0, desktopLimit),
      visibleMetricsMobile: showAll ? metrics : metrics.slice(0, mobileLimit),
      shouldShowButton: hasMoreThanMobileLimit,
      hasMoreThanMobileLimit,
      hasMoreThanDesktopLimit,
      totalCount,
    };
  }, [metrics, showAll, mobileLimit, desktopLimit]);
}

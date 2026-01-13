export interface UseVisibleMetricsConfig {
  mobileLimit?: number;
  desktopLimit?: number;
}

export interface UseVisibleMetricsReturn<T> {
  visibleMetricsDesktop: T[];
  visibleMetricsMobile: T[];
  shouldShowButton: boolean;
  hasMoreThanMobileLimit: boolean;
  hasMoreThanDesktopLimit: boolean;
  totalCount: number;
}

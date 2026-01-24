import { DateRangeHandler, DateRangePeriod } from "@/core/types";
import {
  lastMonthRange,
  lastNDaysRange,
  lastWeekRange,
  thisMonthRange,
  thisQuarterRange,
  thisWeekRange,
  thisYearRange,
  todayRange,
  yesterdayRange,
} from "@/core/utils";

/**
 * Maps each supported DateRangePeriod to its corresponding date range handler.
 *
 * Each handler receives a reference date (`t`) and, when applicable,
 * a timezone offset or normalization parameter (`n`), and returns
 * a calculated date range.
 */
export const DATE_RANGE_HANDLERS: Record<DateRangePeriod, DateRangeHandler> = {
  /**
   * Range covering the current day.
   */
  today: (t) => todayRange(t),

  /**
   * Range covering the previous day.
   */
  yesterday: (t) => yesterdayRange(t),

  /**
   * Range covering the current week.
   */
  thisWeek: (t, n) => thisWeekRange(t, n),

  /**
   * Range covering the previous week.
   */
  lastWeek: (t) => lastWeekRange(t),

  /**
   * Range covering the current month.
   */
  thisMonth: (t, n) => thisMonthRange(t, n),

  /**
   * Range covering the previous month.
   */
  lastMonth: (t) => lastMonthRange(t),

  /**
   * Range covering the current quarter.
   */
  thisQuarter: (t, n) => thisQuarterRange(t, n),

  /**
   * Range covering the current year.
   */
  thisYear: (t, n) => thisYearRange(t, n),

  /**
   * Rolling range covering the last 7 days.
   */
  last7Days: (t, n) => lastNDaysRange(t, n, 7),

  /**
   * Rolling range covering the last 30 days.
   */
  last30Days: (t, n) => lastNDaysRange(t, n, 30),

  /**
   * Rolling range covering the last 90 days.
   */
  last90Days: (t, n) => lastNDaysRange(t, n, 90),

  /**
   * Rolling range covering the last 365 days.
   */
  last365Days: (t, n) => lastNDaysRange(t, n, 365),
};

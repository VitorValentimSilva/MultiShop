import { DateRangeFilterDto } from "@/core/types/dtos";
import { DateRangePeriod } from "@/core/types";
import { DATE_RANGE_HANDLERS } from "@/core/constants";
import {
  endOfDay,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  subtractDays,
  toRangeTimestamp,
  toTimestamp,
} from "@/core/utils";

// * Creates a date range for the current day
export function todayRange(today: Date): DateRangeFilterDto {
  return {
    startDate: today.toISOString(),
    endDate: endOfDay(today).toISOString(),
  };
}

// * Creates a date range for the previous day
export function yesterdayRange(today: Date): DateRangeFilterDto {
  const yesterday = subtractDays(today, 1);

  return {
    startDate: yesterday.toISOString(),
    endDate: endOfDay(yesterday).toISOString(),
  };
}

// * Creates a date range from the start of the current week until now
export function thisWeekRange(today: Date, now: Date): DateRangeFilterDto {
  return {
    startDate: startOfWeek(today).toISOString(),
    endDate: endOfDay(now).toISOString(),
  };
}

// * Creates a date range covering the entire previous week
export function lastWeekRange(today: Date): DateRangeFilterDto {
  const start = subtractDays(startOfWeek(today), 7);
  const end = subtractDays(startOfWeek(today), 1);

  return {
    startDate: start.toISOString(),
    endDate: endOfDay(end).toISOString(),
  };
}

// * Creates a date range from the start of the current month until now
export function thisMonthRange(today: Date, now: Date): DateRangeFilterDto {
  return {
    startDate: startOfMonth(today).toISOString(),
    endDate: endOfDay(now).toISOString(),
  };
}

// * Creates a date range covering the entire previous month
export function lastMonthRange(today: Date): DateRangeFilterDto {
  const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const end = new Date(today.getFullYear(), today.getMonth(), 0);

  return {
    startDate: start.toISOString(),
    endDate: endOfDay(end).toISOString(),
  };
}

// * Creates a date range from the start of the current quarter until now
export function thisQuarterRange(today: Date, now: Date): DateRangeFilterDto {
  return {
    startDate: startOfQuarter(today).toISOString(),
    endDate: endOfDay(now).toISOString(),
  };
}

// * Creates a date range from the start of the current year until now
export function thisYearRange(today: Date, now: Date): DateRangeFilterDto {
  return {
    startDate: startOfYear(today).toISOString(),
    endDate: endOfDay(now).toISOString(),
  };
}

// * Creates a rolling date range for the last N days (inclusive)
export function lastNDaysRange(
  today: Date,
  now: Date,
  days: number
): DateRangeFilterDto {
  return {
    startDate: startOfDay(subtractDays(today, days - 1)).toISOString(),
    endDate: endOfDay(now).toISOString(),
  };
}

// * Creates a date range based on a predefined period
// * Uses a reference date (defaults to current date/time)
export function createDateRangeFilter(
  period: DateRangePeriod,
  referenceDate: Date = new Date()
): DateRangeFilterDto {
  const today = startOfDay(referenceDate);

  return DATE_RANGE_HANDLERS[period](today, referenceDate);
}

// * Checks whether a
// * Handles open-ended ranges (missing start or end)
// * Supports inclusive and exclusive comparisons
export function isDateInRange(
  date: Date | string,
  range: DateRangeFilterDto,
  inclusive = true
): boolean {
  const timestamp = toTimestamp(date);

  const start = toRangeTimestamp(-Infinity, range.startDate);
  const end = toRangeTimestamp(Infinity, range.endDate);

  const isAfterStart = inclusive ? timestamp >= start : timestamp > start;
  const isBeforeEnd = inclusive ? timestamp <= end : timestamp < end;

  return isAfterStart && isBeforeEnd;
}

// * Checks whether two date ranges overlap
// * Supports open-ended ranges on both sides
export function dateRangesOverlap(
  range1: DateRangeFilterDto,
  range2: DateRangeFilterDto
): boolean {
  const start1 = toRangeTimestamp(-Infinity, range1.startDate);
  const end1 = toRangeTimestamp(Infinity, range1.endDate);

  const start2 = toRangeTimestamp(-Infinity, range2.startDate);
  const end2 = toRangeTimestamp(Infinity, range2.endDate);

  return start1 <= end2 && start2 <= end1;
}

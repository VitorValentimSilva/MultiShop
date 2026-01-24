import { MS_PER_DAY } from "@/core/constants";

// * Returns a new Date set to the start of the given day (00:00:00.000)
export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// * Returns a new Date set to the end of the given day (23:59:59.999)
export function endOfDay(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999
  );
}

// * Returns a new Date representing the start of the week (Sunday)
// * Time is normalized to the start of the day
export function startOfWeek(date: Date): Date {
  const day = startOfDay(date);
  day.setDate(day.getDate() - day.getDay());

  return day;
}

// * Returns a new Date representing the first day of the month
export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

// * Returns a new Date representing the first day of the current quarter
export function startOfQuarter(date: Date): Date {
  const quarter = Math.floor(date.getMonth() / 3);

  return new Date(date.getFullYear(), quarter * 3, 1);
}

// * Returns a new Date representing the first day of the year
export function startOfYear(date: Date): Date {
  return new Date(date.getFullYear(), 0, 1);
}

// * Subtracts a number of days from a date
export function subtractDays(date: Date, days: number): Date {
  return new Date(date.getTime() - days * MS_PER_DAY);
}

// * Adds a number of days to a date
export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * MS_PER_DAY);
}

// * Converts a Date or ISO string into a timestamp (milliseconds)
export function toTimestamp(value: Date | string): number {
  return new Date(value).getTime();
}

// * Converts an optional ISO date string into a timestamp
// * Returns a fallback value if the date is undefined
export function toRangeTimestamp(fallback: number, value?: string): number {
  return value ? new Date(value).getTime() : fallback;
}

// * Ensures a value is returned as a Date instance
export function toDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(value);
}

// * Checks whether a value is a valid Date instance
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

// * Attempts to parse a Date or ISO string
// * Returns null if the resulting date is invalid
export function parseDate(value: string | Date): Date | null {
  const date = toDate(value);

  return isValidDate(date) ? date : null;
}

// * Formats a Date as an ISO 8601 string
export function formatISODate(date: Date): string {
  return date.toISOString();
}

// * Calculates the number of days between two dates (rounded up)
export function daysBetween(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());

  return Math.ceil(diffTime / MS_PER_DAY);
}

// * Checks whether two dates fall on the same calendar day
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// * Checks whether a date represents today
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

// * Checks whether a date is in the past
export function isPast(date: Date): boolean {
  return date.getTime() < Date.now();
}

// * Checks whether a date is in the future
export function isFuture(date: Date): boolean {
  return date.getTime() > Date.now();
}

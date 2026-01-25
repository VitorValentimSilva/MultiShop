import {
  startOfDay as dateFnsStartOfDay,
  endOfDay as dateFnsEndOfDay,
  startOfWeek as dateFnsStartOfWeek,
  startOfMonth as dateFnsStartOfMonth,
  startOfQuarter as dateFnsStartOfQuarter,
  startOfYear as dateFnsStartOfYear,
  subDays,
  addDays as dateFnsAddDays,
  differenceInDays,
  isSameDay as dateFnsIsSameDay,
  isToday as dateFnsIsToday,
  isPast as dateFnsIsPast,
  isFuture as dateFnsIsFuture,
  isValid,
  parseISO,
} from "date-fns";

// * Returns a new Date set to the start of the given day (00:00:00.000)
export function startOfDay(date: Date): Date {
  return dateFnsStartOfDay(date);
}

// * Returns a new Date set to the end of the given day (23:59:59.999)
export function endOfDay(date: Date): Date {
  return dateFnsEndOfDay(date);
}

// * Returns a new Date representing the start of the week (Sunday)
// * Time is normalized to the start of the day
export function startOfWeek(date: Date): Date {
  return dateFnsStartOfWeek(date, { weekStartsOn: 0 });
}

// * Returns a new Date representing the first day of the month
export function startOfMonth(date: Date): Date {
  return dateFnsStartOfMonth(date);
}

// * Returns a new Date representing the first day of the current quarter
export function startOfQuarter(date: Date): Date {
  return dateFnsStartOfQuarter(date);
}

// * Returns a new Date representing the first day of the year
export function startOfYear(date: Date): Date {
  return dateFnsStartOfYear(date);
}

// * Subtracts a number of days from a date
export function subtractDays(date: Date, days: number): Date {
  return subDays(date, days);
}

// * Adds a number of days to a date
export function addDays(date: Date, days: number): Date {
  return dateFnsAddDays(date, days);
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
  return value instanceof Date ? value : parseISO(value);
}

// * Checks whether a value is a valid Date instance
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && isValid(value);
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

// * Calculates the number of days between two dates (absolute value)
export function daysBetween(startDate: Date, endDate: Date): number {
  return Math.abs(differenceInDays(endDate, startDate));
}

// * Checks whether two dates fall on the same calendar day
export function isSameDay(date1: Date, date2: Date): boolean {
  return dateFnsIsSameDay(date1, date2);
}

// * Checks whether a date represents today
export function isToday(date: Date): boolean {
  return dateFnsIsToday(date);
}

// * Checks whether a date is in the past
export function isPast(date: Date): boolean {
  return dateFnsIsPast(date);
}

// * Checks whether a date is in the future
export function isFuture(date: Date): boolean {
  return dateFnsIsFuture(date);
}

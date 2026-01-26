import { isAfter, isBefore, isValid, parseISO } from "date-fns";
import { z } from "zod";

import { DATE_ERROR_CODES } from "@/core/constants";
import {
  formatISODate,
  isFuture,
  isPast,
  isToday,
  isValidDateValue,
  toDate,
} from "@/core/utils";

/**
 * * Maps date validation errors to standardized error codes.
 * * Error messages are meant to be consumed by i18n or client-side handlers.
 */
export const DATE_ERROR_MESSAGES = {
  invalid: DATE_ERROR_CODES.DATE_INVALID,
  invalidIsoFormat: DATE_ERROR_CODES.DATE_INVALID_ISO_FORMAT,
  mustBePast: DATE_ERROR_CODES.DATE_MUST_BE_PAST,
  mustBeFuture: DATE_ERROR_CODES.DATE_MUST_BE_FUTURE,
  mustBePastOrToday: DATE_ERROR_CODES.DATE_MUST_BE_PAST_OR_TODAY,
  mustBeFutureOrToday: DATE_ERROR_CODES.DATE_MUST_BE_FUTURE_OR_TODAY,
  rangeInvalid: DATE_ERROR_CODES.DATE_RANGE_INVALID,
  outOfRange: DATE_ERROR_CODES.DATE_OUT_OF_RANGE,
  mustBeAfter: DATE_ERROR_CODES.DATE_MUST_BE_AFTER,
  mustBeBefore: DATE_ERROR_CODES.DATE_MUST_BE_BEFORE,
} as const;

/**
 * * Validates an ISO 8601 date string.
 * * Ensures the string can be parsed into a valid Date.
 */
export const isoDateSchema = z
  .string()
  .refine((val) => isValid(parseISO(val)), {
    message: DATE_ERROR_MESSAGES.invalidIsoFormat,
  });

/**
 * * Base date schema.
 * * Accepts a Date object or a string and normalizes it into a Date.
 */
export const dateSchema = z
  .union([z.string(), z.date()])
  .refine((val) => isValidDateValue(val), {
    message: DATE_ERROR_MESSAGES.invalid,
  })
  .transform((val) => toDate(val));

/**
 * * Optional date schema.
 */
export const optionalDateSchema = dateSchema.optional();

/**
 * * Nullable date schema.
 */
export const nullableDateSchema = dateSchema.nullable();

/**
 * * Validates that the date is strictly in the past.
 */
export const pastDateSchema = dateSchema.refine((date) => isPast(date), {
  message: DATE_ERROR_MESSAGES.mustBePast,
});

/**
 * * Validates that the date is strictly in the future.
 */
export const futureDateSchema = dateSchema.refine((date) => isFuture(date), {
  message: DATE_ERROR_MESSAGES.mustBeFuture,
});

/**
 * * Validates that the date is in the past or today.
 */
export const pastOrTodayDateSchema = dateSchema.refine(
  (date) => isPast(date) || isToday(date),
  { message: DATE_ERROR_MESSAGES.mustBePastOrToday }
);

/**
 * * Validates that the date is in the future or today.
 */
export const futureOrTodayDateSchema = dateSchema.refine(
  (date) => isFuture(date) || isToday(date),
  { message: DATE_ERROR_MESSAGES.mustBeFutureOrToday }
);

/**
 * * Validates a date range where startDate must be before or equal to endDate.
 */
export const dateRangeSchema = z
  .object({
    startDate: dateSchema,
    endDate: dateSchema,
  })
  .refine(
    ({ startDate, endDate }) =>
      isBefore(startDate, endDate) || startDate.getTime() === endDate.getTime(),
    { message: DATE_ERROR_MESSAGES.rangeInvalid }
  );

/**
 * * Optional date range schema.
 * * Validation is only applied if both dates are present.
 */
export const optionalDateRangeSchema = z
  .object({
    startDate: optionalDateSchema,
    endDate: optionalDateSchema,
  })
  .refine(
    ({ startDate, endDate }) => {
      if (!startDate || !endDate) return true;

      return (
        isBefore(startDate, endDate) ||
        startDate.getTime() === endDate.getTime()
      );
    },
    { message: DATE_ERROR_MESSAGES.rangeInvalid }
  );

/**
 * * Creates a schema that validates a date within a given range.
 *
 * @param minDate - Minimum allowed date (exclusive)
 * @param maxDate - Maximum allowed date (exclusive)
 */
export function createDateInRangeSchema(minDate: Date, maxDate: Date) {
  return dateSchema.refine(
    (date) => isAfter(date, minDate) && isBefore(date, maxDate),
    {
      message: DATE_ERROR_MESSAGES.outOfRange,
      params: {
        minDate: formatISODate(minDate),
        maxDate: formatISODate(maxDate),
      },
    }
  );
}

/**
 * * Creates a schema that validates a date after a given minimum date.
 *
 * @param minDate - Minimum allowed date (exclusive)
 */
export function createDateAfterSchema(minDate: Date) {
  return dateSchema.refine((date) => isAfter(date, minDate), {
    message: DATE_ERROR_MESSAGES.mustBeAfter,
    params: { minDate: formatISODate(minDate) },
  });
}

/**
 * * Creates a schema that validates a date before a given maximum date.
 *
 * @param maxDate - Maximum allowed date (exclusive)
 */
export function createDateBeforeSchema(maxDate: Date) {
  return dateSchema.refine((date) => isBefore(date, maxDate), {
    message: DATE_ERROR_MESSAGES.mustBeBefore,
    params: { maxDate: formatISODate(maxDate) },
  });
}

/**
 * * Schema inference types.
 */
export type IsoDateSchemaType = z.infer<typeof isoDateSchema>;
export type DateSchemaType = z.infer<typeof dateSchema>;
export type PastDateSchemaType = z.infer<typeof pastDateSchema>;
export type FutureDateSchemaType = z.infer<typeof futureDateSchema>;
export type DateRangeSchemaType = z.infer<typeof dateRangeSchema>;
export type OptionalDateRangeSchemaType = z.infer<
  typeof optionalDateRangeSchema
>;

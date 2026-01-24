import { NullOperator, OperatorHandler } from "@/core/types";
import { compare, safeTestRegex } from "@/core/utils";

/**
 * * Handlers responsible for nullability checks.
 * * Uses loose equality on purpose to match both `null` and `undefined`.
 * ! This behavior is intentional and should not be replaced with strict checks.
 */
export const nullOperators: Record<NullOperator, OperatorHandler> = {
  // * Checks if the actual value is null or undefined
  isNull: (actual) => actual == null,

  // * Checks if the actual value is NOT null and NOT undefined
  isNotNull: (actual) => actual != null,
};

/**
 * * Strict equality operators.
 * * These handlers rely on JavaScript strict comparison (=== / !==).
 */
export const equalityOperators: Record<string, OperatorHandler> = {
  // * Equal
  eq: (a, b) => a === b,

  // * Not equal
  ne: (a, b) => a !== b,
};

/**
 * * Comparison operators.
 * * Uses the shared `compare` utility to safely handle different data types
 * * (e.g. numbers, dates, or comparable primitives).
 * ? If new comparable types are added, they should be supported inside `compare`.
 */
export const comparisonOperators: Record<string, OperatorHandler> = {
  // * Greater than
  gt: (a, b) => compare(a, b, (x, y) => x > y),

  // * Greater than or equal
  gte: (a, b) => compare(a, b, (x, y) => x >= y),

  // * Less than
  lt: (a, b) => compare(a, b, (x, y) => x < y),

  // * Less than or equal
  lte: (a, b) => compare(a, b, (x, y) => x <= y),
};

/**
 * * Array-based operators.
 * * These handlers assume the comparison value (`b`) is an array.
 * ! If `b` is not an array, the operation safely returns false.
 */
export const arrayOperators: Record<string, OperatorHandler> = {
  // * Checks if `a` exists inside array `b`
  in: (a, b) => Array.isArray(b) && b.includes(a),

  // * Checks if `a` does NOT exist inside array `b`
  nin: (a, b) => Array.isArray(b) && !b.includes(a),
};

/**
 * * String operators.
 * * All string comparisons are case-insensitive by default.
 * ! Non-string values automatically return false.
 */
export const stringOperators: Record<string, OperatorHandler> = {
  // * Checks if string `a` contains string `b`
  contains: (a, b) => {
    if (typeof a !== "string" || typeof b !== "string") return false;
    return a.toLowerCase().includes(b.toLowerCase());
  },

  // * Checks if string `a` starts with string `b`
  startsWith: (a, b) => {
    if (typeof a !== "string" || typeof b !== "string") return false;
    return a.toLowerCase().startsWith(b.toLowerCase());
  },

  // * Checks if string `a` ends with string `b`
  endsWith: (a, b) => {
    if (typeof a !== "string" || typeof b !== "string") return false;
    return a.toLowerCase().endsWith(b.toLowerCase());
  },

  /**
   * * Regex match operator.
   * * Uses `safeTestRegex` to avoid runtime errors caused by invalid patterns.
   * ! Invalid or unsafe regex patterns will result in `false`.
   */
  regex: (a, b) => safeTestRegex(a, b),
};

/**
 * * Unified operator registry.
 * * Merges all operator groups into a single lookup table.
 */
export const operatorHandlers: Record<string, OperatorHandler> = {
  ...nullOperators,
  ...equalityOperators,
  ...comparisonOperators,
  ...arrayOperators,
  ...stringOperators,
};

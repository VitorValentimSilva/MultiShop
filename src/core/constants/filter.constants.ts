import { FieldType } from "@/core/types";
import { isBoolean, isDate, isNumber, isString } from "@/core/utils";

/**
 * * Operators that perform strict equality checks.
 */
export const EQUALITY_OPERATORS = new Set(["eq", "ne"]);

/**
 * * Operators used for numeric or comparable value comparisons.
 */
export const COMPARISON_OPERATORS = new Set(["gt", "gte", "lt", "lte"]);

/**
 * * Operators that work with array values.
 * * Typically used for "value IN array" semantics.
 */
export const ARRAY_OPERATORS = new Set(["in", "nin"]);

/**
 * * Operators that apply only to string values.
 */
export const STRING_OPERATORS = new Set([
  "contains",
  "startsWith",
  "endsWith",
  "regex",
]);

/**
 * * Operators related to nullability checks.
 * * These operators ignore the actual field type.
 */
export const NULL_OPERATORS = new Set(["isNull", "isNotNull"]);

/**
 * * Ordered list of field type detectors.
 * * The first detector that matches determines the field type.
 * ! Order matters: more specific detectors should come first.
 */
export const FIELD_TYPE_DETECTORS: readonly [
  (value: unknown) => boolean,
  FieldType,
][] = [
  [isString, "string"],
  [isNumber, "number"],
  [isDate, "date"],
  [isBoolean, "boolean"],
];

/**
 * * Operators allowed for string fields.
 * * Includes equality, string-specific, array, and null operators.
 */
export const STRING_FIELD_OPERATORS = new Set([
  ...EQUALITY_OPERATORS,
  ...STRING_OPERATORS,
  ...ARRAY_OPERATORS,
  ...NULL_OPERATORS,
]);

/**
 * * Operators allowed for numeric fields.
 * * Includes comparison operators in addition to equality.
 */
export const NUMBER_FIELD_OPERATORS = new Set([
  ...EQUALITY_OPERATORS,
  ...COMPARISON_OPERATORS,
  ...ARRAY_OPERATORS,
  ...NULL_OPERATORS,
]);

/**
 * * Operators allowed for date fields.
 * * Similar to numeric fields but excludes array operators by design.
 * ? Add ARRAY_OPERATORS here only if date arrays become a valid use case.
 */
export const DATE_FIELD_OPERATORS = new Set([
  ...EQUALITY_OPERATORS,
  ...COMPARISON_OPERATORS,
  ...NULL_OPERATORS,
]);

/**
 * * Operators allowed for boolean fields.
 * * Only equality and null checks make sense here.
 */
export const BOOLEAN_FIELD_OPERATORS = new Set([
  ...EQUALITY_OPERATORS,
  ...NULL_OPERATORS,
]);

/**
 * * Complete set of all supported operators.
 * * Used as a fallback when field type cannot be determined.
 */
export const ALL_OPERATORS = new Set([
  ...EQUALITY_OPERATORS,
  ...COMPARISON_OPERATORS,
  ...ARRAY_OPERATORS,
  ...STRING_OPERATORS,
  ...NULL_OPERATORS,
]);

/**
 * * Mapping between field types and their allowed operators.
 * * Ensures invalid operator/type combinations are rejected early.
 */
export const OPERATORS_BY_FIELD_TYPE: Record<FieldType, ReadonlySet<string>> = {
  string: STRING_FIELD_OPERATORS,
  number: NUMBER_FIELD_OPERATORS,
  date: DATE_FIELD_OPERATORS,
  boolean: BOOLEAN_FIELD_OPERATORS,

  // * Fallback when field type cannot be inferred
  unknown: ALL_OPERATORS,
};

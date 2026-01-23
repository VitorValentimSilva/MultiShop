import {
  ArrayFilterConditionDto,
  BaseFilterConditionDto,
  DateRangeFilterDto,
  NullFilterConditionDto,
} from "@/core/types/dtos";

// * Logical operator used to combine filter conditions
export type FilterLogic = "and" | "or";

// * Predefined date range periods for relative filtering
export type DateRangePeriod =
  | "today"
  | "yesterday"
  | "thisWeek"
  | "lastWeek"
  | "thisMonth"
  | "lastMonth"
  | "thisQuarter"
  | "thisYear"
  | "last7Days"
  | "last30Days"
  | "last90Days"
  | "last365Days";

// * Equality comparison operators
export type EqualityOperator = "eq" | "ne";

// * Numeric and date comparison operators
export type ComparisonOperator = "gt" | "gte" | "lt" | "lte";

// * Array-based operators
export type ArrayOperator = "in" | "nin";

// * String-specific operators
export type StringOperator = "contains" | "startsWith" | "endsWith" | "regex";

// * Null-check operators
export type NullOperator = "isNull" | "isNotNull";

// * Union of all supported filter operators
export type FilterOperator =
  | EqualityOperator
  | ComparisonOperator
  | ArrayOperator
  | StringOperator
  | NullOperator;

// * Operators allowed for string fields
export type StringFieldOperators =
  | EqualityOperator
  | StringOperator
  | ArrayOperator
  | NullOperator;

// * Operators allowed for numeric fields
export type NumberFieldOperators =
  | EqualityOperator
  | ComparisonOperator
  | ArrayOperator
  | NullOperator;

// * Operators allowed for date fields
export type DateFieldOperators =
  | EqualityOperator
  | ComparisonOperator
  | NullOperator;

// * Operators allowed for boolean fields
export type BooleanFieldOperators = EqualityOperator | NullOperator;

// * High-level classification of field data types
export type FieldType = "string" | "number" | "date" | "boolean" | "unknown";

// * Runtime handler used to evaluate a filter condition
export type OperatorHandler = (actual: unknown, expected: unknown) => boolean;

// * Handler that resolves a date range based on current time
export type DateRangeHandler = (today: Date, now: Date) => DateRangeFilterDto;

// * Resolves the allowed filter condition types for a given entity field
// * Uses conditional typing to enforce correct operators and value types
export type FilterConditionForField<
  TEntity,
  TField extends keyof TEntity,
> = TEntity[TField] extends string | null | undefined
  ?
      | BaseFilterConditionDto<
          TField,
          EqualityOperator | StringOperator,
          string
        >
      | ArrayFilterConditionDto<TField, string>
      | NullFilterConditionDto<TField>
  : TEntity[TField] extends number | null | undefined
    ?
        | BaseFilterConditionDto<
            TField,
            EqualityOperator | ComparisonOperator,
            number
          >
        | ArrayFilterConditionDto<TField, number>
        | NullFilterConditionDto<TField>
    : TEntity[TField] extends Date | null | undefined
      ?
          | BaseFilterConditionDto<
              TField,
              EqualityOperator | ComparisonOperator,
              Date | string
            >
          | NullFilterConditionDto<TField>
      : TEntity[TField] extends boolean | null | undefined
        ?
            | BaseFilterConditionDto<TField, EqualityOperator, boolean>
            | NullFilterConditionDto<TField>
        :
            | BaseFilterConditionDto<TField, EqualityOperator, TEntity[TField]>
            | NullFilterConditionDto<TField>;

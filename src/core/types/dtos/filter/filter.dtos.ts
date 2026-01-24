import {
  ArrayOperator,
  DateRangePeriod,
  FilterLogic,
  FilterOperator,
  NullOperator,
} from "@/core/types";

// * Base structure for a filter condition
// * Used internally or as a building block for more specific filters
export interface BaseFilterConditionDto<TField, TOperator, TValue> {
  // * Field to be filtered
  readonly field: TField;

  // * Operator applied to the field
  readonly operator: TOperator;

  // * Value used by the operator
  readonly value: TValue;
}

// * Filter condition for null-check operations
// * Does not accept a value
export interface NullFilterConditionDto<TField> {
  // * Field to be evaluated
  readonly field: TField;

  // * Null-related operator (e.g. isNull, isNotNull)
  readonly operator: NullOperator;

  // * Explicitly disallowed value
  readonly value?: never;
}

// * Filter condition for array-based operators
// * Value must always be an array
export interface ArrayFilterConditionDto<TField, TValue> {
  // * Field to be filtered
  readonly field: TField;

  // * Array operator (e.g. in, nin)
  readonly operator: ArrayOperator;

  // * Collection of values to compare against
  readonly value: readonly TValue[];
}

// * Generic filter condition bound to an entity shape
export interface FilterConditionDto<
  TEntity = Record<string, unknown>,
  TField extends keyof TEntity = keyof TEntity,
> {
  // * Entity field being filtered
  readonly field: TField;

  // * Operator used in the comparison
  readonly operator: FilterOperator;

  // * Value or list of values depending on the operator
  readonly value?: TEntity[TField] | readonly TEntity[TField][];
}

// * Represents a logical group of filters
// * Can be nested to support complex filter trees
export interface FilterGroupDto<TEntity = Record<string, unknown>> {
  // * Logical operator applied to the group (and / or)
  readonly logic: FilterLogic;

  // * List of filter conditions or nested groups
  readonly conditions: readonly (
    | FilterConditionDto<TEntity>
    | FilterGroupDto<TEntity>
  )[];
}

// * Defines a date range filter configuration
export interface DateRangeFilterDto {
  // * Start date (ISO string)
  readonly startDate?: string;

  // * End date (ISO string)
  readonly endDate?: string;

  // * Predefined period shortcut (e.g. last7Days, thisMonth)
  readonly period?: DateRangePeriod;

  // * Whether start/end dates are inclusive
  readonly inclusive?: boolean;
}

// * Main filter input object used by APIs or queries
export interface FilterInputDto<TEntity = Record<string, unknown>> {
  // * Flat list of filter conditions
  readonly filters?: readonly FilterConditionDto<TEntity>[];

  // * Grouped and nested filter conditions
  readonly filterGroups?: readonly FilterGroupDto<TEntity>[];

  // * Optional date range filter bound to a specific entity field
  readonly dateRange?: DateRangeFilterDto & {
    readonly field: keyof TEntity;
  };
}

// * Result of filter validation
export interface FilterValidationResultDto {
  // * Indicates whether the filter input is valid
  readonly valid: boolean;

  // * List of validation error messages
  readonly errors: readonly string[];
}

// * Options controlling filter validation behavior
export interface FilterValidationOptionsDto {
  // * Enables strict validation rules
  readonly strict?: boolean;

  // * Allows filtering by fields not defined on the entity
  readonly allowUnknownFields?: boolean;
}

import { operatorHandlers } from "@/core/constants";
import { FilterLogic } from "@/core/types";
import { FilterConditionDto } from "@/core/types/dtos";
import { isNumber, isDate, isString } from "@/core/utils";

// * Converts a value to a comparable number if it is already a number
export function numberToComparable(value: unknown): number | null {
  return isNumber(value) ? value : null;
}

// * Converts a Date value to a comparable timestamp
export function dateToComparable(value: unknown): number | null {
  return isDate(value) ? value.getTime() : null;
}

// * Attempts to parse a string as a Date and return its timestamp
// * Returns null if the string is not a valid date
export function stringToComparable(value: unknown): number | null {
  if (!isString(value)) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.getTime();
}

// * Converts a value to a numeric comparable representation
// * Supports numbers, Date instances, and date-like strings
export function toComparable(value: unknown): number | null {
  return (
    numberToComparable(value) ??
    dateToComparable(value) ??
    stringToComparable(value)
  );
}

// * Converts two values into a comparable numeric pair
// * Returns null if either value cannot be converted
export function getComparablePair(
  actual: unknown,
  expected: unknown
): [number, number] | null {
  const a = toComparable(actual);
  const b = toComparable(expected);

  return a === null || b === null ? null : [a, b];
}

// * Compares two values using a numeric comparator function
// * Returns false if values cannot be converted
export function compare(
  actual: unknown,
  expected: unknown,
  comparator: (a: number, b: number) => boolean
): boolean {
  const pair = getComparablePair(actual, expected);
  return pair ? comparator(pair[0], pair[1]) : false;
}

// * Evaluates whether a single entity matches a filter condition
export function matchesFilter<TEntity extends Record<string, unknown>>(
  entity: TEntity,
  condition: FilterConditionDto<TEntity>
): boolean {
  const actual = entity[condition.field as string];
  const handler = operatorHandlers[condition.operator];

  return handler ? handler(actual, condition.value) : false;
}

// * Checks whether an entity matches all provided filter conditions
export function matchesAllFilters<TEntity extends Record<string, unknown>>(
  entity: TEntity,
  conditions: readonly FilterConditionDto<TEntity>[]
): boolean {
  return conditions.every((condition) => matchesFilter(entity, condition));
}

// * Checks whether an entity matches at least one filter condition
// * Returns true when the condition list is empty
export function matchesAnyFilter<TEntity extends Record<string, unknown>>(
  entity: TEntity,
  conditions: readonly FilterConditionDto<TEntity>[]
): boolean {
  return (
    conditions.length === 0 ||
    conditions.some((condition) => matchesFilter(entity, condition))
  );
}

// * Type guard to determine whether an item is a filter group
export function isFilterGroup<TEntity>(
  item:
    | FilterConditionDto<TEntity>
    | { logic: string; conditions: readonly unknown[] }
): item is { logic: FilterLogic; conditions: readonly unknown[] } {
  return "logic" in item && "conditions" in item;
}

// * Evaluates a single condition or a nested filter group
export function matchesCondition<TEntity extends Record<string, unknown>>(
  entity: TEntity,
  condition:
    | FilterConditionDto<TEntity>
    | { logic: FilterLogic; conditions: readonly unknown[] }
): boolean {
  return isFilterGroup<TEntity>(condition)
    ? matchesFilterGroup(
        entity,
        condition as Parameters<typeof matchesFilterGroup<TEntity>>[1]
      )
    : matchesFilter(entity, condition as FilterConditionDto<TEntity>);
}

// * Evaluates multiple conditions using logical AND
export function matchesAnd<TEntity extends Record<string, unknown>>(
  entity: TEntity,
  conditions: readonly (
    | FilterConditionDto<TEntity>
    | { logic: FilterLogic; conditions: readonly unknown[] }
  )[]
): boolean {
  return conditions.every((c) => matchesCondition(entity, c));
}

// * Evaluates multiple conditions using logical OR
export function matchesOr<TEntity extends Record<string, unknown>>(
  entity: TEntity,
  conditions: readonly (
    | FilterConditionDto<TEntity>
    | { logic: FilterLogic; conditions: readonly unknown[] }
  )[]
): boolean {
  return conditions.some((c) => matchesCondition(entity, c));
}

// * Evaluates a filter group based on its logical operator (AND / OR)
export function matchesFilterGroup<TEntity extends Record<string, unknown>>(
  entity: TEntity,
  group: {
    readonly logic: FilterLogic;
    readonly conditions: readonly (
      | FilterConditionDto<TEntity>
      | { logic: FilterLogic; conditions: readonly unknown[] }
    )[];
  }
): boolean {
  if (group.logic === "and") {
    return matchesAnd(entity, group.conditions);
  }

  return matchesOr(entity, group.conditions);
}

// * Checks whether a value is a valid number
// * Excludes NaN values
export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !Number.isNaN(value);
}

// * Checks whether a value is a string
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

// * Checks whether a value is a valid Date instance
// * Ensures the date is not an invalid Date (NaN timestamp)
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

// * Checks whether a value is a boolean
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

// * Checks whether a value is a plain object
// * Excludes null and arrays
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// * Checks whether a value is an array
// * Generic allows inferring the array item type
export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}

// * Checks whether a value is null or undefined
// * Uses loose equality to match both
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value == null;
}

// * Checks whether a value is defined (not null or undefined)
// * Commonly used for filtering optional values
export function isDefined<T>(value: T | null | undefined): value is T {
  return value != null;
}

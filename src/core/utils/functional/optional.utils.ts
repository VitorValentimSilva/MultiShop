import { Optional, Result } from "@/core/types";
import { NoneDto, SomeDto } from "@/core/types/dtos";
import { err, ok } from "@/core/utils";

// * Creates a Some optional containing a value
export function some<T>(value: T): SomeDto<T> {
  return { _tag: "Some", isSome: true, value };
}

// * Creates an empty None optional
export function none(): NoneDto {
  return { _tag: "None", isSome: false };
}

// * Converts a nullable value into an Optional
export function fromNullable<T>(value: T | null | undefined): Optional<T> {
  return value != null ? some(value) : none();
}

// * Creates an Optional based on a predicate result
export function fromPredicate<T>(
  value: T,
  predicate: (value: T) => boolean
): Optional<T> {
  return predicate(value) ? some(value) : none();
}

// * Type guard that checks if the Optional is Some
export function isSome<T>(optional: Optional<T>): optional is SomeDto<T> {
  return optional.isSome;
}

// * Type guard that checks if the Optional is None
export function isNone<T>(optional: Optional<T>): optional is NoneDto {
  return !optional.isSome;
}

// * Extracts the value or throws if None
export function unwrap<T>(optional: Optional<T>): T {
  if (optional.isSome) return optional.value;
  throw new Error("Called unwrap on None");
}

// * Extracts the value or returns a default
export function unwrapOr<T>(optional: Optional<T>, defaultValue: T): T {
  return optional.isSome ? optional.value : defaultValue;
}

// * Extracts the value or computes a default lazily
export function unwrapOrElse<T>(optional: Optional<T>, fn: () => T): T {
  return optional.isSome ? optional.value : fn();
}

// * Converts Optional to undefined when None
export function toNullable<T>(optional: Optional<T>): T | undefined {
  return optional.isSome ? optional.value : undefined;
}

// * Converts Optional to null when None
export function toNull<T>(optional: Optional<T>): T | null {
  return optional.isSome ? optional.value : null;
}

// * Maps the value inside Some
export function map<T, U>(
  optional: Optional<T>,
  fn: (value: T) => U
): Optional<U> {
  return optional.isSome ? some(fn(optional.value)) : none();
}

// * Flat-maps the Optional
export function flatMap<T, U>(
  optional: Optional<T>,
  fn: (value: T) => Optional<U>
): Optional<U> {
  return optional.isSome ? fn(optional.value) : none();
}

// * Keeps the Optional only if the predicate passes
export function filter<T>(
  optional: Optional<T>,
  predicate: (value: T) => boolean
): Optional<T> {
  return optional.isSome && predicate(optional.value) ? optional : none();
}

// * Filters and narrows the type using a type guard
export function filterMap<T, U extends T>(
  optional: Optional<T>,
  guard: (value: T) => value is U
): Optional<U> {
  return optional.isSome && guard(optional.value)
    ? some(optional.value)
    : none();
}

// * Pattern-matching helper for Optional
export function match<T, U>(
  optional: Optional<T>,
  handlers: { some: (value: T) => U; none: () => U }
): U {
  return optional.isSome ? handlers.some(optional.value) : handlers.none();
}

// * Executes a side effect if Some, returning the original Optional
export function tap<T>(
  optional: Optional<T>,
  fn: (value: T) => void
): Optional<T> {
  if (optional.isSome) fn(optional.value);

  return optional;
}

// * Returns the first Some Optional
export function or<T>(
  optional: Optional<T>,
  alternative: Optional<T>
): Optional<T> {
  return optional.isSome ? optional : alternative;
}

// * Lazily evaluates an alternative Optional
export function orElse<T>(
  optional: Optional<T>,
  fn: () => Optional<T>
): Optional<T> {
  return optional.isSome ? optional : fn();
}

// * Combines two Optionals into one containing a tuple
export function zip<T, U>(
  opt1: Optional<T>,
  opt2: Optional<U>
): Optional<[T, U]> {
  if (opt1.isSome && opt2.isSome) {
    return some([opt1.value, opt2.value]);
  }

  return none();
}

// * Combines two Optionals using a mapping function
export function zipWith<T, U, R>(
  opt1: Optional<T>,
  opt2: Optional<U>,
  fn: (t: T, u: U) => R
): Optional<R> {
  return map(zip(opt1, opt2), ([t, u]) => fn(t, u));
}

// * Converts an array of Optionals into an Optional of array
// * Returns None if any element is None
export function combine<T>(optionals: readonly Optional<T>[]): Optional<T[]> {
  const values: T[] = [];

  for (const opt of optionals) {
    if (!opt.isSome) return none();

    values.push(opt.value);
  }

  return some(values);
}

// * Converts Optional into a Result
export function toResult<T, E>(optional: Optional<T>, error: E): Result<T, E> {
  return optional.isSome ? ok(optional.value) : err(error);
}

// * Converts Optional into a Result with lazy error creation
export function toResultLazy<T, E>(
  optional: Optional<T>,
  getError: () => E
): Result<T, E> {
  return optional.isSome ? ok(optional.value) : err(getError());
}

// * Creates an Optional from the first element of an array
export function fromArray<T>(array: readonly T[]): Optional<T> {
  return array.length > 0 ? some(array[0]) : none();
}

// * Converts Optional to an array
export function toArray<T>(optional: Optional<T>): T[] {
  return optional.isSome ? [optional.value] : [];
}

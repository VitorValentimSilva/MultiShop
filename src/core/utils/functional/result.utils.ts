import {
  AsyncResult,
  Result,
  UnwrapResultErrors,
  UnwrapResults,
} from "@/core/types";
import { ErrDto, OkDto, ResultErrorDto } from "@/core/types/dtos";

// * Creates an Ok result
export function ok<T>(value: T): OkDto<T> {
  return { _tag: "Ok", ok: true, value };
}

// * Creates an Err result
export function err<E>(error: E): ErrDto<E> {
  return { _tag: "Err", ok: false, error };
}

// * Type guard that checks if the result is Ok
export function isOk<T, E>(result: Result<T, E>): result is OkDto<T> {
  return result.ok;
}

// * Type guard that checks if the result is Err
export function isErr<T, E>(result: Result<T, E>): result is ErrDto<E> {
  return !result.ok;
}

// * Extracts the value or throws the error
export function unwrap<T, E>(result: Result<T, E>): T {
  if (result.ok) return result.value;

  throw result.error;
}

// * Extracts the value or returns a default
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  return result.ok ? result.value : defaultValue;
}

// * Extracts the value or computes a default based on the error
export function unwrapOrElse<T, E>(
  result: Result<T, E>,
  fn: (error: E) => T
): T {
  return result.ok ? result.value : fn(result.error);
}

// * Extracts the error or throws if Ok
export function unwrapErr<T, E>(result: Result<T, E>): E {
  if (!result.ok) return result.error;

  throw new Error("Called unwrapErr on Ok value");
}

// * Converts Result to undefined on Err
export function toNullable<T, E>(result: Result<T, E>): T | undefined {
  return result.ok ? result.value : undefined;
}

// * Maps the Ok value
export function map<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U
): Result<U, E> {
  return result.ok ? ok(fn(result.value)) : result;
}

// * Maps the Err value
export function mapErr<T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F
): Result<T, F> {
  return result.ok ? result : err(fn(result.error));
}

// * Maps both Ok and Err
export function mapBoth<T, U, E, F>(
  result: Result<T, E>,
  onOk: (value: T) => U,
  onErr: (error: E) => F
): Result<U, F> {
  return result.ok ? ok(onOk(result.value)) : err(onErr(result.error));
}

// * Chains another Result-producing function
export function andThen<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>
): Result<U, E> {
  return result.ok ? fn(result.value) : result;
}

// * Recovers from an error with another Result
export function orElse<T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => Result<T, F>
): Result<T, F> {
  return result.ok ? result : fn(result.error);
}

// * Async version of andThen
export async function andThenAsync<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => AsyncResult<U, E>
): AsyncResult<U, E> {
  return result.ok ? fn(result.value) : result;
}

// * Pattern-matching helper for Result
export function match<T, E, U>(
  result: Result<T, E>,
  handlers: { ok: (value: T) => U; err: (error: E) => U }
): U {
  return result.ok ? handlers.ok(result.value) : handlers.err(result.error);
}

// * Executes a side effect on Ok
export function tap<T, E>(
  result: Result<T, E>,
  fn: (value: T) => void
): Result<T, E> {
  if (result.ok) fn(result.value);

  return result;
}

// * Executes a side effect on Err
export function tapErr<T, E>(
  result: Result<T, E>,
  fn: (error: E) => void
): Result<T, E> {
  if (!result.ok) fn(result.error);

  return result;
}

// * Combines multiple Results, failing fast on the first Err
export function combine<T extends readonly Result<unknown, unknown>[]>(
  results: T
): Result<UnwrapResults<T>, UnwrapResultErrors<T>> {
  const values: unknown[] = [];

  for (const result of results) {
    if (!result.ok) {
      return result as ErrDto<UnwrapResultErrors<T>>;
    }

    values.push(result.value);
  }

  return ok(values as UnwrapResults<T>);
}

// * Combines Results collecting all errors
export function combineAll<T extends readonly Result<unknown, unknown>[]>(
  results: T
): Result<UnwrapResults<T>, UnwrapResultErrors<T>[]> {
  const { values, errors } = results.reduce(
    (acc, result) =>
      result.ok
        ? { ...acc, values: [...acc.values, result.value] }
        : { ...acc, errors: [...acc.errors, result.error] },
    { values: [] as unknown[], errors: [] as unknown[] }
  );

  return errors.length > 0
    ? err(errors as UnwrapResultErrors<T>[])
    : ok(values as UnwrapResults<T>);
}

// * Tuple-friendly version of combine
export function combineTuple<T extends readonly Result<any, any>[]>(
  ...results: T
): Result<UnwrapResults<T>, UnwrapResultErrors<T>> {
  return combine(results);
}

// * Normalizes unknown errors into a ResultErrorDto
export function toResultError(error: unknown): ResultErrorDto {
  return error instanceof Error
    ? { message: error.message, cause: error }
    : typeof error === "string"
      ? { message: error }
      : { message: "Unknown error", cause: error };
}

// * Converts a Promise into an AsyncResult
export async function fromPromise<T, E = ResultErrorDto>(
  promise: Promise<T>,
  mapError: (error: unknown) => E = toResultError as (error: unknown) => E
): AsyncResult<T, E> {
  try {
    const value = await promise;

    return ok(value);
  } catch (error) {
    return err(mapError(error));
  }
}

// * Wraps a throwable function into a Result
export function fromThrowable<T, E = ResultErrorDto>(
  fn: () => T,
  mapError: (error: unknown) => E = toResultError as (error: unknown) => E
): Result<T, E> {
  try {
    return ok(fn());
  } catch (error) {
    return err(mapError(error));
  }
}

// * Converts nullable values into a Result
export function fromNullable<T, E>(
  value: T | null | undefined,
  error: E
): Result<T, E> {
  return value != null ? ok(value) : err(error);
}

// * Converts Result into a Promise
export function toPromise<T, E>(result: Result<T, E>): Promise<T> {
  return result.ok
    ? Promise.resolve(result.value)
    : Promise.reject(result.error);
}

// * Maps the Ok value asynchronously
export async function mapAsync<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Promise<U>
): AsyncResult<U, E> {
  if (!result.ok) return result;

  return ok(await fn(result.value));
}

// * Combines multiple AsyncResults
export async function combineAsync<T, E>(
  asyncResults: readonly AsyncResult<T, E>[]
): AsyncResult<T[], E> {
  const results = await Promise.all(asyncResults);

  return combine(results) as Result<T[], E>;
}

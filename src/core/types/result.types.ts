import { ErrDto, NoneDto, OkDto, SomeDto } from "@/core/types/dtos";

// * Result type representing a success (Ok) or failure (Err)
export type Result<T, E = Error> = OkDto<T> | ErrDto<E>;

// * Asynchronous result wrapper
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

// * Extracts the success value type from an Ok result
export type UnwrapOk<R> = R extends OkDto<infer T> ? T : never;

// * Extracts the error type from an Err result
export type UnwrapErr<R> = R extends ErrDto<infer E> ? E : never;

// * Unwraps an array of Result types into an array of success value types
export type UnwrapResults<T extends readonly Result<unknown, unknown>[]> = {
  [K in keyof T]: T[K] extends Result<infer U, unknown> ? U : never;
};

// * Extracts all possible error types from an array of Result types
export type UnwrapResultErrors<T extends readonly Result<unknown, unknown>[]> =
  { [K in keyof T]: T[K] extends Result<unknown, infer E> ? E : never }[number];

// * Optional value representation (Some | None)
export type Optional<T> = SomeDto<T> | NoneDto;

// * Extracts the inner value from a Some optional
export type UnwrapOptional<O> = O extends SomeDto<infer T> ? T : never;

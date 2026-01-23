import { AsyncStatus } from "@/core/types";

// * Generic representation of an asynchronous state
// * Commonly used in frontend state management
export interface AsyncStateDto<T, E = Error> {
  // * Current async status (idle, loading, success, error)
  readonly status: AsyncStatus;

  // * Data returned by the async operation (if any)
  readonly data: T | null;

  // * Error returned by the async operation (if any)
  readonly error: E | null;
}

// * Initial state before any async action is triggered
export interface IdleStateDto<T, E = Error> extends AsyncStateDto<T, E> {
  readonly status: "idle";
  readonly data: null;
  readonly error: null;
}

// * State representing an ongoing async operation
export interface LoadingStateDto<T, E = Error> extends AsyncStateDto<T, E> {
  readonly status: "loading";

  // * Data may be preserved while loading (e.g. optimistic UI)
  readonly data: T | null;

  readonly error: null;
}

// * State representing a successful async operation
export interface SuccessStateDto<T, E = Error> extends AsyncStateDto<T, E> {
  readonly status: "success";

  // * Data is guaranteed to be present on success
  readonly data: T;

  readonly error: null;
}

// * State representing a failed async operation
export interface ErrorStateDto<T, E = Error> extends AsyncStateDto<T, E> {
  readonly status: "error";

  // * Data may or may not be present when an error occurs
  readonly data: T | null;

  // * Error is guaranteed to be present
  readonly error: E;
}

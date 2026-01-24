import type { AsyncStateUnion } from "@/core/types";
import type {
  IdleStateDto,
  LoadingStateDto,
  SuccessStateDto,
  ErrorStateDto,
} from "@/core/types/dtos";

// * Creates an idle async state
export function idle<T, E = Error>(): IdleStateDto<T, E> {
  return { status: "idle", data: null, error: null };
}

// * Creates a loading async state, optionally keeping previous data
export function loading<T, E = Error>(
  previousData: T | null = null
): LoadingStateDto<T, E> {
  return { status: "loading", data: previousData, error: null };
}

// * Creates a success async state
export function success<T, E = Error>(data: T): SuccessStateDto<T, E> {
  return { status: "success", data, error: null };
}

// * Creates an error async state, optionally keeping previous data
export function error<T, E = Error>(
  err: E,
  previousData: T | null = null
): ErrorStateDto<T, E> {
  return { status: "error", data: previousData, error: err };
}

// * Type guard for idle state
export function isIdle<T, E>(
  state: AsyncStateUnion<T, E>
): state is IdleStateDto<T, E> {
  return state.status === "idle";
}

// * Type guard for loading state
export function isLoading<T, E>(
  state: AsyncStateUnion<T, E>
): state is LoadingStateDto<T, E> {
  return state.status === "loading";
}

// * Type guard for success state
export function isSuccess<T, E>(
  state: AsyncStateUnion<T, E>
): state is SuccessStateDto<T, E> {
  return state.status === "success";
}

// * Type guard for error state
export function isError<T, E>(
  state: AsyncStateUnion<T, E>
): state is ErrorStateDto<T, E> {
  return state.status === "error";
}

// * Checks if the state currently holds non-null data
export function hasData<T, E>(
  state: AsyncStateUnion<T, E>
): state is AsyncStateUnion<T, E> & { data: T } {
  return state.data !== null;
}

// * Generic state dispatcher with optional handlers and fallback
export function invokeStateHandler<T, E, R>(
  state: AsyncStateUnion<T, E>,
  handlers: {
    idle?: () => R;
    loading?: (data: T | null) => R;
    success?: (data: T) => R;
    error?: (error: E, data: T | null) => R;
  },
  fallbackIdle?: () => R
): R {
  const argsMap: Record<AsyncStateUnion<T, E>["status"], readonly unknown[]> = {
    idle: [],
    loading: [state.data as T | null],
    success: [state.data as T],
    error: [state.error as E, state.data as T | null],
  };

  const handler = (handlers as Record<string, unknown>)[state.status] as
    | ((...a: unknown[]) => R)
    | undefined;

  if (handler) {
    return handler(...(argsMap[state.status] as unknown[]));
  }

  if (state.status === "idle" && typeof fallbackIdle === "function") {
    return fallbackIdle();
  }

  throw new Error(
    `Unhandled ${state.status} state in invokeStateHandler: no handler provided`
  );
}

// * Exhaustive pattern matching for all async states
export function match<T, E, R>(
  state: AsyncStateUnion<T, E>,
  handlers: {
    idle: () => R;
    loading: (data: T | null) => R;
    success: (data: T) => R;
    error: (error: E, data: T | null) => R;
  }
): R {
  return invokeStateHandler(state, {
    idle: handlers.idle,
    loading: handlers.loading,
    success: handlers.success,
    error: handlers.error,
  });
}

// * UI-oriented matcher with loading as default fallback
export function matchUI<T, E, R>(
  state: AsyncStateUnion<T, E>,
  handlers: {
    loading: () => R;
    error: (error: E) => R;
    success: (data: T) => R;
    idle?: () => R;
  }
): R {
  return invokeStateHandler(
    state,
    {
      idle: handlers.idle,
      loading: () => handlers.loading(),
      success: (d) => handlers.success(d),
      error: (e) => handlers.error(e),
    },
    () => handlers.loading()
  );
}

// * Maps the success data while preserving the async state
export function map<T, U, E>(
  state: AsyncStateUnion<T, E>,
  fn: (data: T) => U
): AsyncStateUnion<U, E> {
  if (state.status === "success") {
    return success(fn(state.data));
  }

  return state as unknown as AsyncStateUnion<U, E>;
}

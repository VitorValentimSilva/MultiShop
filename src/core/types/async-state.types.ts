import {
  ErrorStateDto,
  IdleStateDto,
  LoadingStateDto,
  SuccessStateDto,
} from "@/core/types/dtos";

// * Possible statuses for an async operation lifecycle
export type AsyncStatus = "idle" | "loading" | "success" | "error";

// * Discriminated union representing all async state variations
// * Useful for reducers, state machines, and UI state handling
export type AsyncStateUnion<T, E = Error> =
  | IdleStateDto<T, E>
  | LoadingStateDto<T, E>
  | SuccessStateDto<T, E>
  | ErrorStateDto<T, E>;

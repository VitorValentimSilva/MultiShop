import { Response } from "@/app/_types/api";
import { ErrorCode } from "@/app/_errors";

export function ok<T>(data: T): Response<T> {
  return {
    success: true,
    data,
  };
}

export function fail(errorCode: ErrorCode): Response<never> {
  return {
    success: false,
    errorCode,
  };
}

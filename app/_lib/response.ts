import { Response } from "@/app/_types/api";

export function ok<T>(data: T): Response<T> {
  return {
    success: true,
    data,
  };
}

export function fail(
  errorCode: string,
  errors?: Record<string, string[]>,
): Response<never> {
  return {
    success: false,
    errorCode,
    errors,
  };
}

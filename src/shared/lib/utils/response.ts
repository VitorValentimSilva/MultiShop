import { Response } from "@/shared/types/api.types";

/**
 * Response Helpers
 *
 * Utility functions for creating consistent API responses.
 */

/**
 * Create a successful response
 *
 * @param data - Response data
 * @returns Success response
 *
 * @example
 * return ok({ id: "123", name: "John" });
 */
export function ok<T>(data: T): Response<T> {
  return {
    success: true,
    data,
  };
}

/**
 * Create a failure response
 *
 * @param errorCode - Error code string
 * @returns Failure response
 *
 * @example
 * return fail("USER_NOT_FOUND");
 */
export function fail(errorCode: string): Response<never> {
  return {
    success: false,
    errorCode,
  };
}

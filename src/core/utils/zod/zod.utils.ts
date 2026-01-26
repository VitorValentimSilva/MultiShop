import { ZodError, ZodSafeParseResult } from "zod";

import { Result } from "@/core/types";
import { ZodValidationErrorDto } from "@/core/types/dtos";
import { err, ok } from "@/core/utils";

/**
 * * Formats a ZodError into a human-readable string.
 *
 * Each validation issue is converted into:
 * - `path.to.field: message` when a path exists
 * - `message` when the issue is global
 *
 * * Multiple issues are joined using `; `.
 */
export function formatZodError(error: ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
      return `${path}${issue.message}`;
    })
    .join("; ");
}

/**
 * * Converts a Zod safeParse result into a Result type.
 *
 * - On success: returns `ok(data)`
 * - On failure: returns `err` with a formatted message and raw issues
 *
 * * This allows Zod validation to integrate cleanly with
 * * functional error handling across the application.
 */
export function fromZodResult<T>(
  zodResult: ZodSafeParseResult<T>
): Result<T, ZodValidationErrorDto> {
  if (zodResult.success) {
    return ok(zodResult.data);
  }

  return err({
    message: formatZodError(zodResult.error),
    issues: zodResult.error.issues,
  });
}

import { BaseError } from "./base.error";

/**
 * Application Error
 *
 * Base class for application layer errors.
 * Used for use case execution errors and application logic issues.
 */
export class ApplicationError<
  TCode extends string = string,
  TParams extends Record<string, unknown> | undefined = undefined,
> extends BaseError<TCode, TParams> {
  constructor(code: TCode, status = 500, params?: TParams, cause?: unknown) {
    super(code, status, params, cause);
  }
}

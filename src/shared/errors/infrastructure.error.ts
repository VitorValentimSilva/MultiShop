import { BaseError } from "./base.error";

/**
 * Infrastructure Error
 *
 * Base class for infrastructure layer errors.
 * Used for database, external service, and technical errors.
 */
export class InfrastructureError<
  TCode extends string = string,
  TParams extends Record<string, unknown> | undefined = undefined,
> extends BaseError<TCode, TParams> {
  constructor(code: TCode, status = 503, params?: TParams, cause?: unknown) {
    super(code, status, params, cause);
  }
}

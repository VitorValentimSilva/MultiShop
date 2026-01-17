import { BaseError } from "./base.error";

/**
 * Domain Error
 *
 * Base class for domain-specific errors.
 * Used for business rule violations and domain logic errors.
 */
export class DomainError<
  TCode extends string = string,
  TParams extends Record<string, unknown> | undefined = undefined,
> extends BaseError<TCode, TParams> {
  constructor(code: TCode, status = 400, params?: TParams, cause?: unknown) {
    super(code, status, params, cause);
  }
}

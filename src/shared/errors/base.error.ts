/**
 * Base Error Class
 *
 * Abstract base class for all custom errors in the application.
 * Provides consistent error handling with status codes and parameters.
 */
export abstract class BaseError<
  TCode extends string = string,
  TParams extends Record<string, unknown> | undefined = undefined,
> extends Error {
  readonly code: TCode;
  readonly status: number;
  readonly params?: TParams;

  protected constructor(
    code: TCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, { cause });
    this.code = code;
    this.status = status;
    this.params = params;
    this.name = this.constructor.name;
  }
}

export abstract class MainError<
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
  }
}

export abstract class MainError<TCode extends string = string> extends Error {
  readonly code: TCode;
  readonly status: number;

  protected constructor(code: TCode, status = 400, cause?: unknown) {
    super(code, { cause });
    this.code = code;
    this.status = status;
  }
}

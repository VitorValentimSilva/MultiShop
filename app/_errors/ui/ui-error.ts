import { MainError, UiErrorCode } from "@/app/_errors";

export class UiError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<UiErrorCode, TParams> {
  constructor(
    code: UiErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

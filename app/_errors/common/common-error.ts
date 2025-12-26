import { MainError, CommonErrorCode } from "@/app/_errors";

export class CommonError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<CommonErrorCode, TParams> {
  constructor(
    code: CommonErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

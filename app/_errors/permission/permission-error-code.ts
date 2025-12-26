import { MainError, PermissionErrorCode } from "@/app/_errors";

export class PermissionError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<PermissionErrorCode, TParams> {
  constructor(
    code: PermissionErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

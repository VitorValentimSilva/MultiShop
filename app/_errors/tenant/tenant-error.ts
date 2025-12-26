import { MainError, TenantErrorCode } from "@/app/_errors";

export class TenantError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<TenantErrorCode, TParams> {
  constructor(
    code: TenantErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

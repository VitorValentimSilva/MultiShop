import { MainError, RolePermissionErrorCode } from "@/app/_errors";

export class RolePermissionError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<RolePermissionErrorCode, TParams> {
  constructor(
    code: RolePermissionErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

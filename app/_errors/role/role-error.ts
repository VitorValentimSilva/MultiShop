import { MainError, RoleErrorCode } from "@/app/_errors";

export class RoleError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<RoleErrorCode, TParams> {
  constructor(
    code: RoleErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

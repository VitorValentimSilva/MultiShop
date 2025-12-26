import { MainError, UserRoleErrorCode } from "@/app/_errors";

export class UserRoleError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<UserRoleErrorCode, TParams> {
  constructor(
    code: UserRoleErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

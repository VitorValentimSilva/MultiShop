import { MainError, UserErrorCode } from "@/app/_errors";

export class UserError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<UserErrorCode, TParams> {
  constructor(
    code: UserErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

import { MainError, AccountErrorCode } from "@/app/_errors";

export class AccountError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<AccountErrorCode, TParams> {
  constructor(
    code: AccountErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

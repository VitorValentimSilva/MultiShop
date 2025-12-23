import { MainError, AccountErrorCode } from "@/app/_errors";

export class AccountError extends MainError<AccountErrorCode> {
  constructor(code: AccountErrorCode, status = 400, cause?: unknown) {
    super(code, status, cause);
  }
}

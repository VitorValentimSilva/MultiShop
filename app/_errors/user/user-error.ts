import { MainError, UserErrorCode } from "@/app/_errors";

export class UserError extends MainError<UserErrorCode> {
  constructor(code: UserErrorCode, status = 400, cause?: unknown) {
    super(code, status, cause);
  }
}

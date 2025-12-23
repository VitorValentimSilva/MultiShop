import { MainError, UserRoleErrorCode } from "@/app/_errors";

export class UserRoleError extends MainError<UserRoleErrorCode> {
  constructor(code: UserRoleErrorCode, status = 400, cause?: unknown) {
    super(code, status, cause);
  }
}

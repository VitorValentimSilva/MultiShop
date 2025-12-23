import { MainError, RoleErrorCode } from "@/app/_errors";

export class RoleError extends MainError<RoleErrorCode> {
  constructor(code: RoleErrorCode, status = 400, cause?: unknown) {
    super(code, status, cause);
  }
}

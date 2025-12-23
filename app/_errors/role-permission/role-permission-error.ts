import { MainError, RolePermissionErrorCode } from "@/app/_errors";

export class RolePermissionError extends MainError<RolePermissionErrorCode> {
  constructor(code: RolePermissionErrorCode, status = 400, cause?: unknown) {
    super(code, status, cause);
  }
}

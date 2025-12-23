import { MainError, PermissionErrorCode } from "@/app/_errors";

export class PermissionError extends MainError<PermissionErrorCode> {
  constructor(code: PermissionErrorCode, status = 400, cause?: unknown) {
    super(code, status, cause);
  }
}

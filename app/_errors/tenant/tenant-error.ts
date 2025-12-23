import { MainError, TenantErrorCode } from "@/app/_errors";

export class TenantError extends MainError<TenantErrorCode> {
  constructor(code: TenantErrorCode, status = 400, cause?: unknown) {
    super(code, status, cause);
  }
}

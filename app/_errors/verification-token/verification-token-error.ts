import { MainError, VerificationTokenErrorCode } from "@/app/_errors";

export class VerificationTokenError extends MainError<VerificationTokenErrorCode> {
  constructor(code: VerificationTokenErrorCode, status = 400, cause?: unknown) {
    super(code, status, cause);
  }
}

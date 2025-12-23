import { MainError, SessionErrorCode } from "@/app/_errors";

export class SessionError extends MainError<SessionErrorCode> {
  constructor(code: SessionErrorCode, status = 400, cause?: unknown) {
    super(code, status, cause);
  }
}

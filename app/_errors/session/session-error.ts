import { MainError, SessionErrorCode } from "@/app/_errors";

export class SessionError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<SessionErrorCode, TParams> {
  constructor(
    code: SessionErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

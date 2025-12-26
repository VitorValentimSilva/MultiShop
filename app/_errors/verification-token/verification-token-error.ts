import { MainError, VerificationTokenErrorCode } from "@/app/_errors";

export class VerificationTokenError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<VerificationTokenErrorCode, TParams> {
  constructor(
    code: VerificationTokenErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

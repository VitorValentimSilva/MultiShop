import { MainError, RoleTranslationErrorCode } from "@/app/_errors";

export class RoleTranslationError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<RoleTranslationErrorCode, TParams> {
  constructor(
    code: RoleTranslationErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

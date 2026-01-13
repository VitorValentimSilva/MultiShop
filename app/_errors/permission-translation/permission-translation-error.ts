import { MainError, PermissionTranslationErrorCode } from "@/app/_errors";

export class PermissionTranslationError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<PermissionTranslationErrorCode, TParams> {
  constructor(
    code: PermissionTranslationErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

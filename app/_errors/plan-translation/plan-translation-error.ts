import { MainError, PlanTranslationErrorCode } from "@/app/_errors";

export class PlanTranslationError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<PlanTranslationErrorCode, TParams> {
  constructor(
    code: PlanTranslationErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

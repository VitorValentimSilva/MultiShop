import { MainError, DomainMetricTranslationErrorCode } from "@/app/_errors";

export class DomainMetricTranslationError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<DomainMetricTranslationErrorCode, TParams> {
  constructor(
    code: DomainMetricTranslationErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

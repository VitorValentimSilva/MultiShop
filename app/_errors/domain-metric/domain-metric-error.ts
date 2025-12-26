import { MainError, DomainMetricErrorCode } from "@/app/_errors";

export class DomainMetricError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<DomainMetricErrorCode, TParams> {
  constructor(
    code: DomainMetricErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

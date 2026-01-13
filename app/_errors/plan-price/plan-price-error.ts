import { MainError, PlanPriceErrorCode } from "@/app/_errors";

export class PlanPriceError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<PlanPriceErrorCode, TParams> {
  constructor(
    code: PlanPriceErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

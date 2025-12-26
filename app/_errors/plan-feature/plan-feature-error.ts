import { MainError, PlanFeatureErrorCode } from "@/app/_errors";

export class PlanFeatureError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<PlanFeatureErrorCode, TParams> {
  constructor(
    code: PlanFeatureErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

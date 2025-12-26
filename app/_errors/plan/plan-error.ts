import { MainError, PlanErrorCode } from "@/app/_errors";

export class PlanError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<PlanErrorCode, TParams> {
  constructor(
    code: PlanErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

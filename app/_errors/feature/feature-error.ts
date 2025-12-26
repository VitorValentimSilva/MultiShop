import { MainError, FeatureErrorCode } from "@/app/_errors";

export class FeatureError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<FeatureErrorCode, TParams> {
  constructor(
    code: FeatureErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

import { MainError, ReviewErrorCode } from "@/app/_errors";

export class ReviewError<
  TParams extends Record<string, unknown> | undefined = undefined,
> extends MainError<ReviewErrorCode, TParams> {
  constructor(
    code: ReviewErrorCode,
    status = 400,
    params?: TParams,
    cause?: unknown,
  ) {
    super(code, status, params, cause);
  }
}

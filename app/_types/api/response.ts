import { ErrorCode } from "@/app/_errors";

export type Response<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      errorCode: ErrorCode;
    };

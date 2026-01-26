import { core } from "zod";

// * Zod validation error with formatted issues
export interface ZodValidationErrorDto {
  readonly message: string;
  readonly issues: readonly core.$ZodIssue[];
}

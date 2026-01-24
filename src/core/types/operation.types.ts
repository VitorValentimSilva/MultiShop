import type { BaseEntityDto } from "@/core/types/dtos";

// * Input type for create operations
// * Removes system-managed fields that should not be provided by clients
export type CreateInput<T extends BaseEntityDto> = Omit<
  T,
  "id" | "createdAt" | "updatedAt"
>;

// * Input type for update operations
// * Allows partial updates while excluding immutable/system fields
export type UpdateInput<T extends BaseEntityDto> = Partial<
  Omit<T, "id" | "createdAt" | "updatedAt">
>;

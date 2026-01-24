import { SortOrder } from "@/core/types";

// * Sorting configuration for queries
export interface SortingInputDto<T extends string = string> {
  // * Field name used for sorting
  readonly sortBy?: T;

  // * Sort direction (ascending or descending)
  readonly sortOrder?: SortOrder;
}

import { CursorDirection } from "@/core/types";

// * Input parameters for cursor-based pagination
export interface CursorInputDto {
  // * Encoded cursor pointing to the current position
  readonly cursor?: string;

  // * Maximum number of items to return
  readonly limit?: number;

  // * Pagination direction (forward or backward)
  readonly direction?: CursorDirection;
}

// * Metadata returned for cursor-based pagination
export interface CursorMetaDto {
  // * Cursor pointing to the next page, if available
  readonly nextCursor: string | null;

  // * Cursor pointing to the previous page, if available
  readonly prevCursor: string | null;

  // * Indicates if a next page exists
  readonly hasNextPage: boolean;

  // * Indicates if a previous page exists
  readonly hasPrevPage: boolean;

  // * Page size used for the query
  readonly limit: number;

  // * Optional total count (may be expensive to calculate)
  readonly totalCount?: number;
}

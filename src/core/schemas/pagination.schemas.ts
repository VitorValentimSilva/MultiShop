import { z } from "zod";

/**
 * * Input schema for offset-based pagination.
 * * Supports both page/limit and skip/take styles.
 */
export const paginationInputSchema = z.object({
  // * Current page number (1-based)
  page: z.number().int().min(1).optional(),

  // * Maximum number of items per page
  limit: z.number().int().min(1).max(100).optional(),

  // * Number of items to skip (alternative to page)
  skip: z.number().int().min(0).optional(),

  // * Number of items to take (alternative to limit)
  take: z.number().int().min(1).max(100).optional(),
});

/**
 * * Input schema for sorting options.
 */
export const sortingInputSchema = z.object({
  // * Field name to sort by
  sortBy: z.string().optional(),

  // * Sort direction
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

/**
 * * Metadata returned for offset-based paginated responses.
 */
export const paginationMetaSchema = z.object({
  // * Current page number
  page: z.number().int().min(1),

  // * Items per page
  limit: z.number().int().min(1),

  // * Total number of items available
  total: z.number().int().min(0),

  // * Total number of pages available
  totalPages: z.number().int().min(0),

  // * Indicates if there is a next page
  hasNextPage: z.boolean(),

  // * Indicates if there is a previous page
  hasPreviousPage: z.boolean(),

  // * Number of skipped items
  skip: z.number().int().min(0),

  // * Number of items taken
  take: z.number().int().min(1),
});

/**
 * * Metadata returned for cursor-based pagination.
 */
export const cursorMetaSchema = z.object({
  // * Cursor pointing to the next page
  nextCursor: z.string().nullable(),

  // * Cursor pointing to the previous page
  previousCursor: z.string().nullable(),

  // * Indicates if there is a next page
  hasNextPage: z.boolean(),

  // * Indicates if there is a previous page
  hasPreviousPage: z.boolean(),

  // * Optional total count of items (may be expensive to calculate)
  totalCount: z.number().int().min(0).optional(),
});

/**
 * * Factory for creating a paginated response schema (offset-based).
 */
export function createPaginatedResponseSchema<T extends z.ZodTypeAny>(
  itemSchema: T
) {
  return z.object({
    // * List of paginated items
    data: z.array(itemSchema),

    // * Pagination metadata
    meta: paginationMetaSchema,
  });
}

/**
 * * Factory for creating a cursor-based paginated response schema.
 */
export function createCursorPaginatedResponseSchema<T extends z.ZodTypeAny>(
  itemSchema: T
) {
  return z.object({
    // * List of items returned for the current cursor
    items: z.array(itemSchema),

    // * Cursor pagination metadata
    meta: cursorMetaSchema,
  });
}

/**
 * * Inferred TypeScript types from schemas.
 */
export type PaginationInputSchemaType = z.infer<typeof paginationInputSchema>;
export type SortingInputSchemaType = z.infer<typeof sortingInputSchema>;
export type PaginationMetaSchemaType = z.infer<typeof paginationMetaSchema>;
export type CursorMetaSchemaType = z.infer<typeof cursorMetaSchema>;

/**
 * API Response Types
 *
 * Standard response types for API endpoints and server actions.
 */

/**
 * Success/Failure Response Type
 *
 * Discriminated union for type-safe response handling.
 *
 * @example
 * // Success
 * const response: Response<User> = { success: true, data: user };
 *
 * // Failure
 * const response: Response<User> = { success: false, errorCode: "USER_NOT_FOUND" };
 */
export type Response<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      errorCode: string;
    };

/**
 * Pagination Input Parameters
 */
export interface PaginationInput {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Pagination Metadata
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Paginated Response
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Default pagination values
 */
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  sortOrder: "asc" as const,
} as const;

/**
 * Calculate database offset from page and limit
 */
export function calculateOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}

/**
 * Calculate pagination metadata
 */
export function calculatePaginationMeta(
  totalItems: number,
  page: number,
  limit: number,
): PaginationMeta {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    currentPage: page,
    totalPages,
    totalItems,
    itemsPerPage: limit,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

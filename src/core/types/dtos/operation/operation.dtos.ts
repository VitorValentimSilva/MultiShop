// * Represents the aggregated result of a batch operation
// * Commonly used for bulk create/update/delete actions
export interface BatchOperationResultDto {
  // * Number of items processed successfully
  readonly success: number;

  // * Number of items that failed during processing
  readonly failed: number;

  // * Identifiers of successfully processed items
  readonly successIds: readonly string[];

  // * Detailed errors for failed items
  readonly errors: readonly {
    // * Identifier of the item that failed
    readonly id: string;

    // * Human-readable error message
    readonly error: string;
  }[];
}

// * Input DTO for bulk creation operations
export interface BulkCreateInputDto<T> {
  // * Items to be created
  readonly items: readonly T[];

  // * Indicates whether duplicate items should be ignored
  // * Behavior depends on backend implementation
  readonly skipDuplicates?: boolean;
}

// * Input DTO for bulk update operations
export interface BulkUpdateInputDto<T> {
  // * Items to be updated
  // * Each item must include its identifier
  readonly items: readonly (T & { readonly id: string })[];
}

// * Input DTO for bulk delete operations
export interface BulkDeleteInputDto {
  // * Identifiers of items to be deleted
  readonly ids: readonly string[];

  // * Indicates whether deletion should be soft (logical)
  // * If omitted or false, a hard delete is assumed
  readonly soft?: boolean;
}

// * DTO used to control which fields should be included or excluded
// * Useful for projections and response shaping
export interface FieldSelectionDto<T extends string = string> {
  // * Explicit list of fields to include
  readonly include?: readonly T[];

  // * Explicit list of fields to exclude
  readonly exclude?: readonly T[];
}

// * DTO used to configure relation loading behavior
export interface RelationOptionsDto {
  // * Names of relations to be loaded
  readonly relations?: readonly string[];

  // * Maximum depth for nested relation loading
  readonly depth?: number;
}

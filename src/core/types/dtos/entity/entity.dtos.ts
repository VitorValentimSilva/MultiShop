// * Base interface for all entity DTOs
// * Represents common persistence-related fields
export interface BaseEntityDto {
  // * Unique identifier of the entity
  readonly id: string;

  // * ISO timestamp indicating when the entity was created
  readonly createdAt: string;

  // * ISO timestamp indicating when the entity was last updated
  readonly updatedAt: string;
}

// * Marks an entity as soft-deletable
// * Instead of being physically removed, the entity is flagged as deleted
export interface SoftDeletableDto {
  // * ISO timestamp indicating when the entity was soft-deleted
  // * Null means the entity is active
  readonly deletedAt: string | null;
}

// * Adds auditing information to an entity
// * Tracks who created and last updated the record
export interface AuditableDto {
  // * Identifier of the user or system that created the entity
  readonly createdBy?: string;

  // * Identifier of the user or system that last updated the entity
  readonly updatedBy?: string;
}

// * Indicates that the entity belongs to a tenant
// * Used in multi-tenant architectures
export interface TenantDto {
  // * Unique identifier of the tenant
  readonly tenantId: string;
}

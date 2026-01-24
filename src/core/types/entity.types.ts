import {
  AuditableDto,
  BaseEntityDto,
  SoftDeletableDto,
  TenantDto,
} from "@/core/types/dtos";

// * Entity that supports soft deletion
// * Includes a nullable deletedAt timestamp
export type SoftDeletableEntity = BaseEntityDto & SoftDeletableDto;

// * Entity that tracks creation and update metadata
export type AuditableEntity = BaseEntityDto & AuditableDto;

// * Entity associated with a tenant (multi-tenancy support)
export type TenantEntity = BaseEntityDto & TenantDto;

// * Fully featured entity combining:
// * - Base identity fields
// * - Soft deletion support
// * - Audit metadata
// * - Tenant isolation
export type FullAuditableEntity = BaseEntityDto &
  SoftDeletableDto &
  AuditableDto &
  TenantDto;

import { z } from "zod";

import { dateFieldSchema, uuidSchema } from "@/core/utils";

/**
 * * Base entity schema.
 * * Common fields shared by most persisted entities.
 */
export const baseEntitySchema = z.object({
  id: uuidSchema,
  createdAt: dateFieldSchema,
  updatedAt: dateFieldSchema,
});

/**
 * * Soft-deletable entity schema.
 * * Allows entities to be marked as deleted without physical removal.
 */
export const softDeletableSchema = z.object({
  deletedAt: dateFieldSchema.nullable(),
});

/**
 * * Auditable entity schema.
 * * Tracks who created and last updated the entity.
 */
export const auditableSchema = z.object({
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
});

/**
 * * Tenant-aware schema.
 * * Used for multi-tenant entities.
 */
export const tenantSchema = z.object({
  tenantId: uuidSchema,
});

/**
 * * Schema inference types.
 */
export type BaseEntitySchemaType = z.infer<typeof baseEntitySchema>;
export type SoftDeletableSchemaType = z.infer<typeof softDeletableSchema>;
export type AuditableSchemaType = z.infer<typeof auditableSchema>;
export type TenantSchemaType = z.infer<typeof tenantSchema>;

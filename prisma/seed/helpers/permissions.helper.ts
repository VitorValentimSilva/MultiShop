import { PermissionAction, PermissionEntity } from "@/seed/data";

// * Represents a permission generated from an entity + action combination
// * Used mainly during seeding or permission bootstrap
export type GeneratedPermission = {
  key: string;
  action: PermissionAction;
  entity: PermissionEntity;
};

// * Generates a list of CRUD-like permissions for a given entity
// * Each permission key follows the pattern: "<action>:<entity>"
// ! Assumes that the provided actions list is already validated
export function generateCrudPermissions(
  entity: PermissionEntity,
  actions: readonly PermissionAction[]
): GeneratedPermission[] {
  return actions.map((action) => ({
    // * Unique permission identifier used across the system
    key: `${action}:${entity}`,

    // * Domain entity the permission applies to
    entity,

    // * Action allowed over the entity (create, read, update, delete, etc.)
    action,
  }));
}

import { PermissionAction, PermissionEntity } from "@/prisma/seed/data";

export type Locale = "pt-BR" | "en-US";

export type GeneratedPermission = {
  key: string;
  action: PermissionAction;
  entity: PermissionEntity;
};

export function generateCrudPermissions(
  entity: PermissionEntity,
  actions: readonly PermissionAction[],
): GeneratedPermission[] {
  return actions.map((action) => ({
    key: `${action}:${entity}`,
    entity,
    action,
  }));
}

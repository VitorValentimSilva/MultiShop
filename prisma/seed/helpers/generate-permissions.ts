import { PermissionAction } from "@/prisma/seed/constants/permission-actions";
import { PermissionEntity } from "@/prisma/seed/constants/permission-entities";

type GeneratedPermission = {
  key: string;
  label: string;
};

export function generateCrudPermissions(
  entity: PermissionEntity,
  actions: readonly PermissionAction[],
): GeneratedPermission[] {
  return actions.map((action) => ({
    key: `${entity}_${action}`,
    label: `${actionLabel(action)} ${entityLabel(entity)}`,
  }));
}

function actionLabel(action: PermissionAction) {
  const map: Record<PermissionAction, string> = {
    CREATE: "Criar",
    READ: "Visualizar",
    UPDATE: "Editar",
    DELETE: "Remover",
  };

  return map[action];
}

function entityLabel(entity: PermissionEntity) {
  const map: Record<PermissionEntity, string> = {
    TENANT: "tenant",
    USER: "usuário",
    ROLE: "role",
    PERMISSION: "permissão",
    ACCOUNT: "conta",
  };

  return map[entity];
}

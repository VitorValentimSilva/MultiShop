import { Locale } from "@/prisma/seed/helpers";

export const PERMISSION_ACTIONS = [
  "CREATE",
  "READ",
  "UPDATE",
  "DELETE",
] as const;

export const PERMISSION_ENTITIES = [
  "TENANT",
  "USER",
  "ROLE",
  "PERMISSION",
  "ACCOUNT",
  "PLAN",
  "FEATURE",
  "REVIEW",
  "DOMAIN_METRIC",
] as const;

export type PermissionAction = (typeof PERMISSION_ACTIONS)[number];

export type PermissionEntity = (typeof PERMISSION_ENTITIES)[number];

export function actionLabel(action: PermissionAction, locale: Locale) {
  const map: Record<Locale, Record<PermissionAction, string>> = {
    "pt-BR": {
      CREATE: "Criar",
      READ: "Visualizar",
      UPDATE: "Editar",
      DELETE: "Remover",
    },
    "en-US": {
      CREATE: "Create",
      READ: "View",
      UPDATE: "Update",
      DELETE: "Delete",
    },
  };

  return map[locale][action];
}

export function entityLabel(entity: PermissionEntity, locale: Locale) {
  const map: Record<Locale, Record<PermissionEntity, string>> = {
    "pt-BR": {
      TENANT: "tenant",
      USER: "usuário",
      ROLE: "perfil",
      PERMISSION: "permissão",
      ACCOUNT: "conta",
      PLAN: "plano",
      FEATURE: "funcionalidade",
      REVIEW: "avaliação",
      DOMAIN_METRIC: "métrica",
    },
    "en-US": {
      TENANT: "tenant",
      USER: "user",
      ROLE: "role",
      PERMISSION: "permission",
      ACCOUNT: "account",
      PLAN: "plan",
      FEATURE: "feature",
      REVIEW: "review",
      DOMAIN_METRIC: "metric",
    },
  };

  return map[locale][entity];
}

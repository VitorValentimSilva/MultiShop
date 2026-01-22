import { createLogger } from "@/core/lib";
import { prismaSeedClient } from "@/core/database/prisma-seed-client";
import { LOCALES } from "@/core/lib/i18n";
import {
  PERMISSION_ENTITIES,
  PERMISSION_ACTIONS,
  actionLabel,
  entityLabel,
} from "@/seed/data";
import { generateCrudPermissions } from "@/seed/helpers";

const log = createLogger({ scope: "seed", seed: "permissions" });

// * Seeds all permissions and their translations
// * Permissions are generated dynamically based on entities and actions
export async function seedPermissions() {
  log.info("🌱 Seeding permissions (with translations)...");

  // * Generate all CRUD-like permissions for each entity
  // * Example: create:user, read:user, update:user, delete:user
  const permissions = PERMISSION_ENTITIES.flatMap((entity) =>
    generateCrudPermissions(entity, PERMISSION_ACTIONS)
  );

  for (const p of permissions) {
    // * Upsert permission by unique key to ensure idempotency
    const permission = await prismaSeedClient.permission.upsert({
      where: { key: p.key },
      update: {},
      create: {
        key: p.key,
        // * Default label is created using pt-BR locale
        label: `${actionLabel(p.action, "pt-BR")} ${entityLabel(p.entity, "pt-BR")}`,
      },
    });

    // * Create or update translations for all supported locales
    for (const locale of LOCALES) {
      const label = `${actionLabel(p.action, locale)} ${entityLabel(p.entity, locale)}`;

      await prismaSeedClient.permissionTranslation.upsert({
        where: {
          // * Composite unique constraint: (permissionId + locale)
          permissionId_locale: {
            permissionId: permission.id,
            locale,
          },
        },
        update: { label },
        create: {
          permissionId: permission.id,
          locale,
          label,
        },
      });
    }
  }

  log.info("✅ Permissions seed completed.");
}

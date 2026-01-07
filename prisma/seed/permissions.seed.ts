import { prisma } from "@/app/_lib/prisma";
import {
  PERMISSION_ENTITIES,
  PERMISSION_ACTIONS,
  actionLabel,
  entityLabel,
} from "@/prisma/seed/data";
import { generateCrudPermissions } from "@/prisma/seed/helpers";

const LOCALES = ["pt-BR", "en-US"] as const;

export async function seedPermissions() {
  console.log("🌱 Seeding permissions (with translations)...");

  const permissions = PERMISSION_ENTITIES.flatMap((entity) =>
    generateCrudPermissions(entity, PERMISSION_ACTIONS),
  );

  for (const p of permissions) {
    const permission = await prisma.permission.upsert({
      where: { key: p.key },
      update: {},
      create: {
        key: p.key,
        label: `${actionLabel(p.action, "pt-BR")} ${entityLabel(p.entity, "pt-BR")}`,
      },
    });

    for (const locale of LOCALES) {
      const label = `${actionLabel(p.action, locale)} ${entityLabel(p.entity, locale)}`;

      await prisma.permissionTranslation.upsert({
        where: {
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

  console.log("✅ Permissions seed completed.");
}

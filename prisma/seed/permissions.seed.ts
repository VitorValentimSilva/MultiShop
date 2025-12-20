import { prisma } from "@/app/_lib/prisma";
import { PERMISSION_ENTITIES } from "@/prisma/seed/constants/permission-entities";
import { generateCrudPermissions } from "@/prisma/seed/helpers/generate-permissions";
import { PERMISSION_ACTIONS } from "@/prisma/seed/constants/permission-actions";

export async function seedPermissions() {
  const permissions = PERMISSION_ENTITIES.flatMap((entity) =>
    generateCrudPermissions(entity, PERMISSION_ACTIONS),
  );

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { key: permission.key },
      update: {},
      create: {
        key: permission.key,
        label: permission.label,
      },
    });
  }
}

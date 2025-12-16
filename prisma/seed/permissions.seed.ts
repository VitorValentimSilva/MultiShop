import { prisma } from "@/app/_lib/prisma";

export async function seedPermissions() {
  const permissions = [
    { key: "USER_CREATE", label: "Criar usuário" },
    { key: "USER_EDIT", label: "Editar usuário" },
    { key: "USER_DELETE", label: "Remover usuário" },
    { key: "ROLE_MANAGE", label: "Gerenciar roles" },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { key: permission.key },
      update: {},
      create: permission,
    });
  }
}

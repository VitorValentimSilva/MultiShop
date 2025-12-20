import { headers } from "next/headers";

export async function resolveTenantFromRequest(): Promise<string | null> {
  const pathname = (await headers()).get("x-pathname");
  if (!pathname) return null;

  const segments = pathname.split("/").filter(Boolean);
  return segments[1] ?? null;
}

import { NextRequest, NextResponse } from "next/server";
import { getTenantBySlug } from "@/app/_actions/tenant";

const TENANT_ROUTES = ["/private", "/public"];
const PROTECTED_ROUTES = ["/private"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return NextResponse.next();
  }

  const tenant = segments[0];
  const tenantPath = "/" + segments.slice(1).join("/");

  if (tenant === "_next" || tenant === "api" || tenant === "favicon.ico") {
    return NextResponse.next();
  }

  const tenantResponse = await getTenantBySlug(tenant);

  if (!tenantResponse.success) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const isAuthenticated = req.cookies.has("auth_token");

  if (tenantPath === "/") {
    const path = isAuthenticated ? TENANT_ROUTES[0] : TENANT_ROUTES[1];
    return NextResponse.rewrite(new URL(`/${tenant}${path}`, req.url));
  }

  const isProtected = PROTECTED_ROUTES.some((r) => tenantPath.startsWith(r));

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL(`/${tenant}`, req.url));
  }

  return NextResponse.rewrite(new URL(`/${tenant}${tenantPath}`, req.url));
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};

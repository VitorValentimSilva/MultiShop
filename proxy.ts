import { NextRequest, NextResponse } from "next/server";
import { getTenantBySlug } from "@/app/_actions/tenant";

const BASE_DOMAIN = "multi-shop-vv.vercel.app";
const TENANT_ROUTES = ["/private", "/public"];
const PROTECTED_ROUTES = ["/private"];

export async function proxy(req: NextRequest) {
  const host = req.headers.get("host");

  if (!host) return NextResponse.next();

  let subdomain = "";

  if (host.includes(BASE_DOMAIN)) {
    const parts = host.split(".");

    if (parts.length >= 3 && parts[0] !== "www") {
      subdomain = parts[0].toLowerCase().trim();
    }
  }

  if (host.includes("localhost")) {
    subdomain = req.nextUrl.searchParams.get("tenant") || "";
  }

  const currentPath = req.nextUrl.pathname;

  if (!subdomain) {
    const isTenantRoute = TENANT_ROUTES.some((r) => currentPath.startsWith(r));

    if (isTenantRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  const tenantResponse = await getTenantBySlug(subdomain);

  if (!tenantResponse.success) {
    return NextResponse.rewrite(new URL("/", req.url));
  }

  const isAuthenticated = req.cookies.has("auth_token");

  if (isAuthenticated) {
    const path = currentPath === "/" ? "/private" : currentPath;
    return NextResponse.rewrite(new URL(path, req.url));
  }

  const isProtected = PROTECTED_ROUTES.some((r) => currentPath.startsWith(r));

  if (isProtected) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const path = currentPath === "/" ? "/public" : currentPath;
  return NextResponse.rewrite(new URL(path, req.url));
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};

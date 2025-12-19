import { NextRequest, NextResponse } from "next/server";
import { getTenantBySlug } from "@/app/_actions/tenant";
import {
  defaultLocale,
  Locale,
  supportedLocales,
} from "@/app/_lib/i18n/config";

const TENANT_ROUTES = ["/private", "/public"];
const PROTECTED_ROUTES = ["/private"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, req.url));
  }

  const maybeLocale = segments[0];

  if (!supportedLocales.includes(maybeLocale as Locale)) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, req.url),
    );
  }

  const locale = maybeLocale;
  const tenant = segments[1];
  const tenantPath = "/" + segments.slice(2).join("/");

  if (
    !tenant ||
    tenant.startsWith("_next") ||
    tenant === "api" ||
    tenant === "favicon.ico"
  ) {
    return NextResponse.next();
  }

  const tenantResponse = await getTenantBySlug(tenant);

  if (!tenantResponse.success) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  const isAuthenticated = req.cookies.has("auth_token");

  if (tenantPath === "/") {
    const path = isAuthenticated ? TENANT_ROUTES[0] : TENANT_ROUTES[1];
    return NextResponse.rewrite(
      new URL(`/${locale}/${tenant}${path}`, req.url),
    );
  }

  const isProtected = PROTECTED_ROUTES.some((r) => tenantPath.startsWith(r));

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL(`/${locale}/${tenant}`, req.url));
  }

  return NextResponse.rewrite(
    new URL(`/${locale}/${tenant}${tenantPath}`, req.url),
  );
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};

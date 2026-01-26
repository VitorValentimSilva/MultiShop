import * as Sentry from "@sentry/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { localeMiddleware, isExcludedPath } from "@/core/middlewares";

/**
 * * Wraps a middleware call in a try/catch to prevent the whole app from breaking
 * * if the middleware throws.
 */
export function safeLocaleMiddleware(
  request: NextRequest,
  pathname: string
): NextResponse {
  try {
    return localeMiddleware(request);
  } catch (error) {
    Sentry.captureException(error, {
      extra: { pathname, url: request.url },
      tags: { module: "middleware" },
    });

    return NextResponse.next();
  }
}

export function middleware(request: NextRequest): NextResponse {
  const pathname = request.nextUrl.pathname;

  if (isExcludedPath(pathname)) {
    return NextResponse.next();
  }

  return safeLocaleMiddleware(request, pathname);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * Other exclusions are handled by isExcludedPath() and LOCALE_EXCLUDED_PATHS
     */
    "/((?!_next/static|_next/image).*)",
  ],
};

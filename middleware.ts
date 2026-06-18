import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const protectedRoutes = [
  "/dashboard",
  "/health",
  "/brain",
  "/team",
  "/employees",
  "/data",
  "/settings",
  "/create-company",
  "/join-company",
  "/entry",
];

const authRoutes = ["/login", "/register"];

function getLocaleFromPath(pathname: string): string {
  const segment = pathname.split("/")[1];
  if (routing.locales.includes(segment as (typeof routing.locales)[number])) {
    return segment;
  }
  return routing.defaultLocale;
}

function stripLocale(pathname: string): string {
  const segments = pathname.split("/");
  if (
    routing.locales.includes(segments[1] as (typeof routing.locales)[number])
  ) {
    const rest = segments.slice(2).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}

export default function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);

  if (intlResponse.headers.get("location")) {
    return intlResponse;
  }

  const pathname = request.nextUrl.pathname;
  const locale = getLocaleFromPath(pathname);
  const pathWithoutLocale = stripLocale(pathname);

  const isAuthenticated =
    request.cookies.get("ai-bos-auth")?.value === "true";
  const isSetupComplete =
    request.cookies.get("ai-bos-setup")?.value === "true";

  const isProtected = protectedRoutes.some(
    (route) =>
      pathWithoutLocale === route ||
      pathWithoutLocale.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.includes(pathWithoutLocale);

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(
      new URL(`/${locale}/login`, request.url)
    );
  }

  if (pathWithoutLocale === "/" && isAuthenticated && isSetupComplete) {
    return NextResponse.redirect(
      new URL(`/${locale}/dashboard`, request.url)
    );
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(
      new URL(`/${locale}/entry`, request.url)
    );
  }

  return intlResponse;
}

export const config = {
  matcher: ["/", "/(ru|kk|en)/:path*"],
};

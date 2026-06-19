import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

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
  const pathname = request.nextUrl.pathname;
  const locale = getLocaleFromPath(pathname);
  const pathWithoutLocale = stripLocale(pathname);

  const isAuthenticated =
    request.cookies.get("ai-bos-auth")?.value === "true";
  const isSetupComplete =
    request.cookies.get("ai-bos-setup")?.value === "true";

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}`;
    const response = NextResponse.redirect(url);
    response.cookies.set("NEXT_LOCALE", routing.defaultLocale, {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      path: "/",
    });
    return response;
  }

  const isProtected = protectedRoutes.some(
    (route) =>
      pathWithoutLocale === route ||
      pathWithoutLocale.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.includes(pathWithoutLocale);

  if (isProtected && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  if (pathWithoutLocale === "/" && isAuthenticated && isSetupComplete) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/dashboard`;
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/entry`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(ru|kk|en)/:path*"],
};

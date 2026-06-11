import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.get("ai-bos-auth")?.value === "true";
  const isSetupComplete = request.cookies.get("ai-bos-setup")?.value === "true";

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.includes(pathname);

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/" && isAuthenticated && isSetupComplete) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/entry", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/entry",
    "/create-company",
    "/join-company",
    "/dashboard/:path*",
    "/health",
    "/brain",
    "/team",
    "/employees",
    "/data",
    "/settings",
  ],
};

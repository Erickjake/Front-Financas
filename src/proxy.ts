import { type NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = [
  "/dashboard",
  "/transaction",
  "/user",
  "/metas",
  "/categories",
  "/budgets",
  "/reports",
  "/export",
  "/backup",
];
const AUTH_ROUTES = ["/login", "/cadastro"];
const SESSION_COOKIE_CANDIDATES = [
  process.env.AUTH_COOKIE_NAME,
  "app_session",
  "refresh_token",
  "refreshToken",
  "access_token",
  "accessToken",
].filter((name): name is string => Boolean(name));

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignora rotas de API, elas são tratadas pelo rewrites no next.config.ts
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const hasSession = SESSION_COOKIE_CANDIDATES.some((cookieName) =>
    Boolean(request.cookies.get(cookieName)?.value),
  );

  if (isProtected && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

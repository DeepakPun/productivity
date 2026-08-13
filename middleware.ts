import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MENU_ITEMS } from "@/app/constants/navigation";

// 1. Core structural routes that don't live in MENU_ITEMS
const BASE_PUBLIC_ROUTES = ["/"];

// 2. Dynamically gather paths from nav constants
const DYNAMIC_PUBLIC_ROUTES = MENU_ITEMS.filter(
  (item) => !item.requiresAuth,
).map((item) => item.href);

const PUBLIC_ROUTES = [...BASE_PUBLIC_ROUTES, ...DYNAMIC_PUBLIC_ROUTES];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("internal_session");
  const isUserAuthenticated = sessionCookie?.value === "authenticated_admin";

  // 1. Bypass asset bundles and dynamic media assets immediately
  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // 2. Allow access if the route is explicitly public
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // 3. Protect internal routes: Redirect if NOT public AND NOT authenticated
  if (!isPublicRoute && !isUserAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

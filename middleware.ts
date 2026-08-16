import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  const isDashboard = pathname.startsWith("/dashboard");
  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  // اگر لاگین نیست و می‌خواهد وارد داشبورد شود
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // اگر لاگین است و می‌خواهد دوباره وارد صفحات auth شود
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
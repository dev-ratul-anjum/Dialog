import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/rooms", "/profile", "/settings", "/add-chat"];

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/sign-up";

  const cookieStore = await cookies();
  let cookieHeader = cookieStore.toString();
  cookieHeader = decodeURIComponent(cookieHeader);

  const response = await fetch(`${process.env.BACKEND_URL}/auth/v1/me`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  const result = await response.json();

  if (result.success && isAuthPage) {
    return NextResponse.redirect(new URL("/rooms", request.url));
  }

  if (
    !result.success &&
    (protectedRoutes.includes(pathname) || pathname.startsWith("/rooms/"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

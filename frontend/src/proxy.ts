import { NextRequest, NextResponse } from "next/server";
import { getDecodedCookies } from "./lib/cookies";

const protectedRoutes = ["/rooms", "/profile", "/settings", "/add-chat"];

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/sign-up";

  const cookieHeader = await getDecodedCookies(); // Decode for signed cookie

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/v1/me`,
    {
      headers: {
        Cookie: cookieHeader,
      },
    },
  );
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

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
  ],
};

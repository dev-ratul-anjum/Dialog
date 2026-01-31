import { toMilliseconds } from "@/utils/timeConverter";
import { cookies } from "next/headers";

export async function forwardCookie(setCookieHeader: string) {
  if (!setCookieHeader) return;

  const COOKIE_NAME = process.env.ACCESS_TOKEN_NAME!;

  // Extract token value from Set-Cookie header
  const tokenValue = setCookieHeader.split(";")[0].split("=")[1];

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, tokenValue, {
    httpOnly: true,
    path: "/", // available for all paths
    maxAge: toMilliseconds(process.env.ACCESS_TOKEN_EXPIRES_IN!),
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
}

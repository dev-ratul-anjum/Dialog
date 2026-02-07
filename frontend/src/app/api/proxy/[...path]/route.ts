import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.pathname.replace("/api/proxy/", ""); // Dynamic path extract
  const searchParams = request.nextUrl.searchParams.toString(); // Query params
  const fullPath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}${searchParams ? `?${searchParams}` : ""}`;

  const cookieStore = await cookies();
  let cookieHeader = cookieStore.toString();
  cookieHeader = decodeURIComponent(cookieHeader); // Decode for signed cookie

  try {
    const backendResponse = await fetch(fullPath, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
    });

    const data = await backendResponse.json();

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}

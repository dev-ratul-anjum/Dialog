// app/api/proxy/[...path]/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.pathname.replace("/api/proxy/", ""); // Dynamic path extract
  const searchParams = request.nextUrl.searchParams.toString(); // Query params
  const fullPath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}${searchParams ? `?${searchParams}` : ""}`;

  const cookieStore = await cookies();
  let cookieHeader = cookieStore.toString();
  cookieHeader = decodeURIComponent(cookieHeader); // Decode for signed cookie

  console.log("fullPath ", fullPath);

  try {
    const backendResponse = await fetch(fullPath, {
      method: "GET", // Or dynamic: request.method
      headers: {
        Cookie: cookieHeader,
        // Add other headers if needed, e.g., 'Content-Type': 'application/json'
      },
    });

    const data = await backendResponse.json();

    console.log("fullPath data", data);

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// POST/PUT/DELETE support যদি লাগে
export async function POST(request: NextRequest) {
  // Similar as GET, but add body: await request.body()
  // ...
}
// অন্য methods add করুন যা লাগে

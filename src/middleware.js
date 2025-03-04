import { NextResponse } from "next/server";
import { verifyToken } from "@/util/jwt";
import { cookies } from "next/headers";

export async function middleware(req) {
  const url = req.nextUrl;
  console.log("url", url);

  // ✅ Exclude routes like /api/auth/login and /api/auth/register
  if (
    url.pathname.startsWith("/api/auth/login") ||
    url.pathname.startsWith("/api/auth/register")
  ) {
    console.log("skipping middleware for login/register");
    return NextResponse.next(); // Skip middleware for these routes
  }

  // ✅ Only protect routes starting with /api
  if (!url.pathname.startsWith("/api")) {
    return NextResponse.next(); // Skip middleware for non-API routes
  }

  const cookieStore = cookies();
  let token = cookieStore.get("auth_token")?.value;

  if (!token && req.headers.get("authorization")) {
    token = req.headers.get("authorization").replace("Bearer ", "");
  }

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  try {
    console.log("middleware executing...");
    // Make sure to await the asynchronous verifyToken function
    const userData = await verifyToken(token);
    
    if (!userData) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
    }
    
    console.log("User data:", userData);
    
    // Clone the request and create a new NextResponse
    // In Next.js middleware, we need to use headers to pass data
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', userData.id);
    requestHeaders.set('x-user-email', userData.email || '');
    requestHeaders.set('x-user-data', JSON.stringify(userData));
    
    // Return the request with the modified headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
  }
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: '/api/:path*',
};
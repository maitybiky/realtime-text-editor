import { NextResponse } from "next/server";
import { verifyToken } from "./util/jwt";
import { cookies } from "next/headers";

export function middleware(req) {
  const url = req.nextUrl;
  console.log("url", url);

  // ✅ Exclude these routes
  if (
    url.pathname === "/api/auth/login" ||
    url.pathname === "/api/auth/register"
  ) {
    console.log("skipping middleware");
    return NextResponse.next(); // Skip middlewarex
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
    const userData = verifyToken(token);
    req.user = userData;
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
  }
}

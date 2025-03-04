import { NextResponse } from "next/server";
import { generateToken } from "@/util/jwt";
import User from "@/model/user";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectToDatabase();
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Generate JWT token
    const token = await generateToken({ email });

    // ✅ Create response
    const response = NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );

    // ✅ Set JWT token in an HTTP-only cookie
    response.cookies.set("auth_token", token, {
      httpOnly: true, // Prevents JavaScript access (Security feature)
      secure: process.env.NODE_ENV === "production", // Only HTTPS in production
      sameSite: "Lax", // Protects against CSRF attacks
      maxAge: 60 * 60 * 24 * 7, // Expires in 7 days
      path: "/", // Available across the entire domain
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

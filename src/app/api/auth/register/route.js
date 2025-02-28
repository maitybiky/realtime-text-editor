import { NextResponse } from "next/server";
import User from "@/model/user";
import { connectToDatabase } from "@/lib/mongodb";
import { generateToken } from "@/util/jwt";

export async function POST(req) {
  try {
    const { email, password, username } = await req.json();

    if (!email || !password || !username) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // ✅ Create new user
    const newUser = new User({ email, userName: username, password });
    await newUser.save();

    // ✅ Generate JWT token
    const token = await generateToken({ email });

    // ✅ Create response
    const response = NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );

    // ✅ Set JWT token in an HTTP-only cookie
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// app/api/user/route.js
import User from "@/model/user";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Get user data from headers that were set in middleware
    const userId = req.headers.get('x-user-id');
    const userData = req.headers.get('x-user-data');
    
    console.log("User ID from header:", userId);
    
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let user;
    try {
      // Parse the user data from the header
      user = userData ? JSON.parse(userData) : null;
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
    
    console.log("User Details", user);

    await connectToDatabase();

    // Fetch user details from the database using the user ID
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json({ 
      user: {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        // Add other fields you want to expose
        // Don't include password or sensitive information
      } 
    }, { status: 200 });
  } catch (error) {
    console.error("Error getting user:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
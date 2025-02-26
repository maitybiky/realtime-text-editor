import { connectToDatabase } from "@/lib/mongodb";
import User from "@/model/user";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    console.log("email", email, "password", password);

    if (!email || !password) {
      return Response.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase(); // Ensure MongoDB connection

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    return Response.json(
      { message: "Login successful", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

import User from "@/model/user";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { email, password, username } = await req.json();

    if (!email || !password || !username) {
      return Response.json(
        { message: "Email, password, and username are required" },
        { status: 400 }
      );
    }

    await connectToDatabase(); // Ensure MongoDB is connected

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 409 });
    }

    // Save user to MongoDB
    const newUser = new User({ email, userName: username, password });
    await newUser.save();

    return Response.json(
      { message: "User registered successfully" },
      { status: 201 },
      { data: { email, password, username } }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

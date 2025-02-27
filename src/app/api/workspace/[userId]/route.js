import { NextResponse } from "next/server";

import mongoose from "mongoose";
import Workspace from "@/model/workspace";
import { connectToDatabase } from "@/lib/mongodb";

// Fetch all workspaces a user has joined
export async function GET(req, context) {
  const params = await context.params; // Await params before accessing it

  await connectToDatabase();

  const { userId } = params;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
  }

  try {
    const workspaces = await Workspace.aggregate([
      {
        $match: { userIDs: new mongoose.Types.ObjectId(userId) }, // Find workspaces where userId exists in userIDs array
      },
      {
        $lookup: {
          from: "users", // Join with the Users collection
          localField: "userIDs",
          foreignField: "_id",
          as: "users", // Store user details in "users" field
        },
      },
      {
        $lookup: {
          from: "docs", // Join with the Docs collection
          localField: "docs",
          foreignField: "_id",
          as: "documents", // Store document details in "documents" field
        },
      },
    ]);

    return NextResponse.json({ success: true, workspaces }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

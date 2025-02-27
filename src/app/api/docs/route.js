import { NextResponse } from "next/server";



import Workspace from "@/model/workspace";
import { connectToDatabase } from "@/lib/mongodb";
import Docs from "@/model/docs";

export async function POST(req) {
  try {
    const { userId, name } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Create new document
    const newDoc = await Docs.create({ content: "", name });

    const updatedWorkspace = await Workspace.findOneAndUpdate(
      { userIDs: userId }, // Search for workspace where userId exists in userIDs array
      {
        $push: { docs: newDoc._id }, // Add new document ID to the workspace
      },
      {
        new: true, // Return the updated document
        upsert: true, // Create a new workspace if not found
        setDefaultsOnInsert: true, // Apply default values on insert
      }
    );
    if (!updatedWorkspace) {
      return NextResponse.json(
        { error: "Workspace not found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ documentId: newDoc._id }, { status: 201 });
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json(
      { error: "Error creating document" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  await connectToDatabase();

  const { id } = params; // Extract ID from dynamic route

  try {
    const doc = await Docs.findById(id);
    if (!doc)
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );

    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching document" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await connectToDatabase();

  const { id } = params;
  const { content } = await req.json(); // Extract content from request body

  try {
    const updatedDoc = await Docs.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!updatedDoc)
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );

    return NextResponse.json(updatedDoc, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating document" },
      { status: 500 }
    );
  }
}

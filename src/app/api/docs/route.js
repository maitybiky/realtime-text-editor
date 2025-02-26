import { NextResponse } from "next/server";

import Docs from "@/model/docs";
import { connectToDatabase } from "@/lib/mongodb";


export async function POST() {
  await connectToDatabase();

  try {
    const newDoc = await Docs.create({ content: "" }); 
    return NextResponse.json({ documentId: newDoc._id }, { status: 201 });
  } catch (error) {
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
    if (!doc) return NextResponse.json({ error: "Document not found" }, { status: 404 });

    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching document" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await connectToDatabase();

  const { id } = params;
  const { content } = await req.json(); // Extract content from request body

  try {
    const updatedDoc = await Docs.findByIdAndUpdate(id, { content }, { new: true });

    if (!updatedDoc) return NextResponse.json({ error: "Document not found" }, { status: 404 });

    return NextResponse.json(updatedDoc, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating document" }, { status: 500 });
  }
}

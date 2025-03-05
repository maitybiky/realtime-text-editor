import { connectToDatabase } from "@/lib/mongodb";
import Docs from "@/model/docs";
import User from "@/model/user";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    const { params } = await context;
    const docId = params.docsId;
    await connectToDatabase();

    const doc = await Docs.findById(docId);
    if (!doc) {
      return NextResponse.json({ error: "no doc found" }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: doc }, { status: 201 });
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function PUT(req, context) {
  try {
    const { params } = await context;
    const docsId = params.docsId;
    await connectToDatabase();

    const { email } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "no user found" }, { status: 400 });
    }

    const doc = await Docs.findById(docsId);
    if (!doc) {
      return NextResponse.json({ error: "no doc found" }, { status: 400 });
    }
    doc.collaborators.push({
      userId: user._id,
      cursorPosition: 0,
    });
    const newDoc = await doc.save();

    return NextResponse.json({ success: true, data: newDoc }, { status: 201 });
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("GET request received");
  await connectToDatabase()
  return NextResponse.json({ data: "n" });
}
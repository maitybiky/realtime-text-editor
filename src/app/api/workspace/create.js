import connectDB from "@/lib/mongodb";
import Docs from "@/models/Docs";

export default async function handler(req, res) {
  await connectDB(); // Ensure DB connection

  if (req.method === "POST") {
    try {
      const newDoc = await Docs.create({ content: "" }); // Create an empty doc
      return res.status(201).json({ documentId: newDoc._id });
    } catch (error) {
      return res.status(500).json({ error: "Error creating document" });
    }
  } 
  

  
  else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

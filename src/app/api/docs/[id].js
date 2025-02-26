import connectDB from "@/lib/mongodb";
import Docs from "@/models/Docs";

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const doc = await Docs.findById(id);
      if (!doc) return res.status(404).json({ error: "Document not found" });
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching document" });
    }
  } 
  
  else if (req.method === "PUT") {
    try {
      const { content } = req.body;
      const updatedDoc = await Docs.findByIdAndUpdate(
        id,
        { content },
        { new: true }
      );
      if (!updatedDoc) return res.status(404).json({ error: "Document not found" });
      return res.status(200).json(updatedDoc);
    } catch (error) {
      return res.status(500).json({ error: "Error updating document" });
    }
  } 
  
  else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

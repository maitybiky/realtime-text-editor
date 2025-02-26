import mongoose from "mongoose";

const DocsSchema = new mongoose.Schema(
  {
    content:{
        type: String,
        required: [false, "Content is not required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

// Prevent model re-compilation issues in Next.js
export default mongoose.models.Docs || mongoose.model("Docs", DocsSchema);
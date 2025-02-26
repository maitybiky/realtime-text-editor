import mongoose from "mongoose";

const WorkSpaceSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User model
      required: [true, "User ID is required"],
    },
    docs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document", // Refers to the Document model
      },
    ],
  },
  { timestamps: true }
);

// Prevent model re-compilation in Next.js
export default mongoose.models.Workspace || mongoose.model("Workspace", WorkSpaceSchema);

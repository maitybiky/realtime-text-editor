import mongoose from "mongoose";

const WorkSpaceSchema = new mongoose.Schema(
  {
    userIDs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Refers to the User model
        required: true, // Ensure at least one user is associated
      },
    ],
    docs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Docs", // Refers to the Document model
      },
    ],
  },
  { timestamps: true }
);



// Prevent model re-compilation in Next.js
export default mongoose.models.Workspace || mongoose.model("Workspace", WorkSpaceSchema);

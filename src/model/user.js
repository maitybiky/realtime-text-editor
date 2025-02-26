import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

// Prevent model re-compilation issues in Next.js
export default mongoose.models.User || mongoose.model("User", UserSchema);

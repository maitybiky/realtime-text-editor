const mongoose = require("mongoose");

const DocsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: Object,
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

module.exports = mongoose.models.Docs || mongoose.model("Docs", DocsSchema);

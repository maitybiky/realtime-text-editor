const mongoose = require("mongoose");

const DocsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    history: [
      {
        content: {
          type: mongoose.Schema.Types.Mixed,
          default: {},
        },
        updatedAt: { type: Date, default: Date.now },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    collaborators: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        cursorPosition: { type: Number, default: 0 },
      },
    ],
    isLive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.models.Docs || mongoose.model("Docs", DocsSchema);


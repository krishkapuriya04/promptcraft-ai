const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    prompt: { type: String, required: true, trim: true, maxlength: 5000 },
    category: { type: String, default: "SaaS", trim: true },
    theme: { type: String, default: "Modern Gradient", trim: true },
    description: { type: String, default: "", trim: true, maxlength: 300 },
    generatedCode: { type: String, default: "" },
    generatedHtml: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    tags: { type: [String], default: [] },
    isFavorite: { type: Boolean, default: false, index: true },
    lastOpenedAt: { type: Date, default: null },
    version: { type: Number, default: 1 },
    optimizationHistory: {
      type: [
        {
          beforeCode: { type: String, default: "" },
          afterCode: { type: String, default: "" },
          suggestions: { type: [String], default: [] },
          categories: { type: [String], default: [] },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    versions: {
      type: [
        {
          code: { type: String, default: "" },
          summary: { type: String, default: "" },
          label: { type: String, default: "" },
          note: { type: String, default: "" },
          isCheckpoint: { type: Boolean, default: false },
          isFavorite: { type: Boolean, default: false },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    favoriteVersions: { type: [String], default: [] },
    deployments: {
      type: [
        {
          deploymentId: { type: String, required: true },
          provider: { type: String, default: "mock" },
          status: {
            type: String,
            enum: ["queued", "building", "deploying", "ready", "failed"],
            default: "queued",
          },
          url: { type: String, default: "" },
          logs: { type: [String], default: [] },
          sourceVersion: { type: Number, default: 1 },
          deployedAt: { type: Date, default: null },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    deploymentProvider: { type: String, default: "mock" },
    deploymentUrl: { type: String, default: "" },
    deploymentStatus: {
      type: String,
      enum: ["idle", "queued", "building", "deploying", "ready", "failed"],
      default: "idle",
    },
    status: {
      type: String,
      enum: ["draft", "generating", "ready", "failed"],
      default: "draft",
    },
    demoGenerated: { type: Boolean, default: false },
    detectedSections: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);

const Project = require("../models/Project");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const { sendSuccess } = require("../utils/apiResponse");
const { isDemoGenerationMode } = require("../config/aiMode");
const { generateFromScreenshot } = require("../services/screenshotGenerationService");
const { trackActivity } = require("../utils/activityTracker");

const generateFromScreenshotController = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("Screenshot file is required.", 400, "VALIDATION_ERROR");
  }

  const analysis = await generateFromScreenshot({
    imageBuffer: req.file.buffer,
    mimeType: req.file.mimetype || "image/jpeg",
    originalName: req.file.originalname || "upload",
  });

  const project = await Project.create({
    userId: req.user._id,
    name: analysis.title,
    description: analysis.description,
    prompt: `Generated from screenshot: ${analysis.detectedDesignSummary}`,
    category: "SaaS",
    theme: "Modern Gradient",
    generatedCode: analysis.generatedCode,
    generatedHtml: analysis.generatedCode,
    tags: ["screenshot-generation", ...analysis.detectedSections.slice(0, 4)],
    status: "ready",
    demoGenerated: Boolean(analysis.demoMode),
    detectedSections: analysis.detectedSections || [],
  });
  trackActivity({
    userId: req.user._id,
    projectId: project._id,
    type: "screenshot_generation",
    metadata: { sections: analysis.detectedSections },
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: "Screenshot analyzed and website generated successfully.",
    data: {
      generation: {
        projectId: project._id,
        title: analysis.title,
        description: analysis.description,
        detectedDesignSummary: analysis.detectedDesignSummary,
        detectedColors: analysis.detectedColors,
        detectedSections: analysis.detectedSections,
        generatedCode: analysis.generatedCode,
        demoMode: Boolean(analysis.demoMode),
      },
    },
  });
});

const getScreenshotHistory = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    userId: req.user._id,
    tags: { $in: ["screenshot-generation"] },
  })
    .select("_id name description generatedCode tags createdAt")
    .sort({ createdAt: -1 })
    .limit(20);

  return sendSuccess(res, {
    message: "Screenshot generation history fetched.",
    data: {
      demoScreenshotMode: isDemoGenerationMode(),
      history: projects.map((project) => ({
        _id: project._id,
        projectId: project._id,
        title: project.name,
        description: project.description,
        generatedCode: project.generatedCode,
        detectedSections:
          project.detectedSections?.length > 0
            ? project.detectedSections
            : project.tags.filter((tag) => tag !== "screenshot-generation"),
        createdAt: project.createdAt,
        demoMode: Boolean(project.demoGenerated),
      })),
    },
  });
});

module.exports = { generateFromScreenshotController, getScreenshotHistory };

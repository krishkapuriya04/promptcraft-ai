const Project = require("../models/Project");
const { WEBSITE_CATEGORIES, THEME_OPTIONS } = require("../constants/aiGeneration");
const { isDemoGenerationMode } = require("../config/aiMode");
const { generateWebsiteWithAI } = require("../services/aiGenerationService");
const { sendSuccess } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { validateGenerationPayload } = require("../utils/aiValidation");
const { trackActivity } = require("../utils/activityTracker");

const generateWebsite = asyncHandler(async (req, res) => {
  const { prompt, category, theme } = req.body;
  validateGenerationPayload({ prompt, category, theme });

  const generation = await generateWebsiteWithAI({ prompt, category, theme });

  const project = await Project.create({
    userId: req.user._id,
    name: generation.title,
    description: generation.description,
    prompt: prompt.trim(),
    category,
    theme,
    generatedCode: generation.generatedCode,
    generatedHtml: generation.generatedCode,
    status: "ready",
    demoGenerated: Boolean(generation.demoMode),
    detectedSections: generation.detectedSections || [],
  });
  trackActivity({
    userId: req.user._id,
    projectId: project._id,
    type: "ai_generation",
    metadata: { category, theme },
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: "Website generated successfully.",
    data: {
      generation: {
        projectId: project._id,
        title: generation.title,
        description: generation.description,
        category: generation.category,
        generatedCode: generation.generatedCode,
        detectedSections: generation.detectedSections || [],
        demoMode: Boolean(generation.demoMode),
      },
    },
  });
});

const getGenerationHistory = asyncHandler(async (req, res) => {
  const projects = await Project.find({ userId: req.user._id })
    .select("_id name description prompt category theme generatedCode createdAt")
    .sort({ createdAt: -1 })
    .limit(20);

  return sendSuccess(res, {
    message: "Generation history fetched.",
    data: {
      history: projects.map((project) => ({
        _id: project._id,
        title: project.name,
        description: project.description,
        prompt: project.prompt,
        category: project.category,
        theme: project.theme,
        generatedCode: project.generatedCode,
        createdAt: project.createdAt,
        demoMode: Boolean(project.demoGenerated),
        detectedSections: project.detectedSections || [],
      })),
    },
  });
});

const getGenerationOptions = asyncHandler(async (_req, res) =>
  sendSuccess(res, {
    message: "Generation options fetched.",
    data: {
      categories: WEBSITE_CATEGORIES,
      themes: THEME_OPTIONS,
      demoMode: isDemoGenerationMode(),
    },
  })
);

module.exports = { generateWebsite, getGenerationHistory, getGenerationOptions };

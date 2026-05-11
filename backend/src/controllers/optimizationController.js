const Project = require("../models/Project");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const { OPTIMIZATION_CATEGORIES } = require("../constants/optimizationCategories");
const { optimizeUiCode } = require("../services/optimizationService");
const { validateOptimizationPayload } = require("../utils/optimizationValidation");

const getOptimizationOptions = asyncHandler(async (_req, res) =>
  sendSuccess(res, {
    message: "Optimization options fetched.",
    data: { categories: OPTIMIZATION_CATEGORIES },
  })
);

const optimizeProjectUi = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, userId: req.user._id });
  if (!project) {
    throw new AppError("Project not found.", 404, "PROJECT_NOT_FOUND");
  }

  const { code, categories = [] } = req.body;
  validateOptimizationPayload({ code, categories });

  const result = await optimizeUiCode({ code, categories });
  const historyEntry = {
    beforeCode: code,
    afterCode: result.optimizedCode,
    suggestions: result.suggestions,
    categories,
  };

  project.optimizationHistory = [historyEntry, ...(project.optimizationHistory || [])].slice(0, 20);
  await project.save();

  return sendSuccess(res, {
    message: "UI optimization completed.",
    data: {
      optimizedCode: result.optimizedCode,
      summary: result.summary,
      suggestions: result.suggestions,
      history: project.optimizationHistory,
    },
  });
});

const revertOptimization = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, userId: req.user._id });
  if (!project) {
    throw new AppError("Project not found.", 404, "PROJECT_NOT_FOUND");
  }

  const { historyIndex = 0 } = req.body;
  const entry = project.optimizationHistory?.[historyIndex];
  if (!entry) {
    throw new AppError("Optimization history entry not found.", 404, "HISTORY_NOT_FOUND");
  }

  project.generatedCode = entry.beforeCode;
  project.generatedHtml = entry.beforeCode;
  project.version = (project.version || 1) + 1;
  await project.save();

  return sendSuccess(res, {
    message: "Optimization reverted successfully.",
    data: {
      revertedCode: entry.beforeCode,
      project,
    },
  });
});

module.exports = { getOptimizationOptions, optimizeProjectUi, revertOptimization };

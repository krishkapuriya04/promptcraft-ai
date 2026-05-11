const Project = require("../models/Project");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const { EXPORT_FORMATS } = require("../constants/exportFormats");
const { createProjectArchive, listExportFiles } = require("../services/exportService");
const { validateExportPayload } = require("../utils/exportValidation");
const { trackActivity } = require("../utils/activityTracker");

const getExportOptions = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, userId: req.user._id });
  if (!project) {
    throw new AppError("Project not found.", 404, "PROJECT_NOT_FOUND");
  }

  return sendSuccess(res, {
    message: "Export options fetched.",
    data: {
      formats: Object.values(EXPORT_FORMATS),
      files: listExportFiles(project),
    },
  });
});

const exportProjectArchive = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, userId: req.user._id });
  if (!project) {
    throw new AppError("Project not found.", 404, "PROJECT_NOT_FOUND");
  }

  const { format, selectedFiles = [] } = req.body;
  validateExportPayload({ format, selectedFiles });

  const { buffer, filename, files } = await createProjectArchive({ project, format, selectedFiles });
  trackActivity({
    userId: req.user._id,
    projectId: project._id,
    type: "project_export",
    metadata: { format, filesCount: files.length },
  });
  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("X-PromptCraft-Export-Files", JSON.stringify(files));
  return res.status(200).send(buffer);
});

module.exports = { getExportOptions, exportProjectArchive };

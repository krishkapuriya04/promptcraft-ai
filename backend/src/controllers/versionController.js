const Project = require("../models/Project");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const {
  createVersionSnapshot,
  pruneVersions,
  shouldCreateSnapshot,
  summarizeDiff,
} = require("../utils/versioning");
const { trackActivity } = require("../utils/activityTracker");

async function getProjectForUser(userId, projectId) {
  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) {
    throw new AppError("Project not found.", 404, "PROJECT_NOT_FOUND");
  }
  return project;
}

const listVersions = asyncHandler(async (req, res) => {
  const project = await getProjectForUser(req.user._id, req.params.projectId);
  const search = String(req.query.search || "").toLowerCase();
  const onlyCheckpoints = req.query.checkpoints === "true";

  let versions = project.versions || [];
  if (search) {
    versions = versions.filter(
      (item) =>
        item.label?.toLowerCase().includes(search) ||
        item.note?.toLowerCase().includes(search) ||
        item.summary?.toLowerCase().includes(search)
    );
  }
  if (onlyCheckpoints) {
    versions = versions.filter((item) => item.isCheckpoint);
  }

  return sendSuccess(res, {
    message: "Version history fetched.",
    data: {
      versions,
      favoriteVersions: project.favoriteVersions || [],
    },
  });
});

const saveCheckpoint = asyncHandler(async (req, res) => {
  const project = await getProjectForUser(req.user._id, req.params.projectId);
  const { label = "", note = "", code = project.generatedCode || "" } = req.body;

  if (!code || code.trim().length < 10) {
    throw new AppError("Code is too short for checkpoint.", 400, "VALIDATION_ERROR");
  }

  const latestCode = project.versions?.[0]?.code || "";
  const summary = summarizeDiff(latestCode, code);
  const snapshot = createVersionSnapshot({
    code,
    summary,
    label: label.trim() || `Checkpoint v${(project.version || 1) + 1}`,
    note,
    isCheckpoint: true,
  });
  project.versions = pruneVersions([snapshot, ...(project.versions || [])]);
  project.generatedCode = code;
  project.generatedHtml = code;
  project.version = (project.version || 1) + 1;
  await project.save();
  trackActivity({
    userId: req.user._id,
    projectId: project._id,
    type: "version_checkpoint",
    metadata: { label: snapshot.label },
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: "Checkpoint saved.",
    data: { version: project.versions[0], project },
  });
});

const restoreVersion = asyncHandler(async (req, res) => {
  const project = await getProjectForUser(req.user._id, req.params.projectId);
  const versionId = String(req.params.versionId);
  const target = (project.versions || []).find((item) => String(item._id) === versionId);
  if (!target) {
    throw new AppError("Version not found.", 404, "VERSION_NOT_FOUND");
  }

  const previousCode = project.generatedCode || "";
  if (shouldCreateSnapshot(previousCode, target.code)) {
    const restoreSnapshot = createVersionSnapshot({
      code: target.code,
      summary: `Restored from ${target.label || "selected version"}.`,
      label: `Restore v${(project.version || 1) + 1}`,
      note: "Time-travel restore operation",
      isCheckpoint: true,
    });
    project.versions = pruneVersions([restoreSnapshot, ...(project.versions || [])]);
  }

  project.generatedCode = target.code;
  project.generatedHtml = target.code;
  project.version = (project.version || 1) + 1;
  await project.save();
  trackActivity({
    userId: req.user._id,
    projectId: project._id,
    type: "version_restore",
    metadata: { restoredLabel: target.label },
  });

  return sendSuccess(res, {
    message: "Version restored successfully.",
    data: { project, restoredVersion: target },
  });
});

const compareVersions = asyncHandler(async (req, res) => {
  const project = await getProjectForUser(req.user._id, req.params.projectId);
  const { fromVersionId, toVersionId } = req.query;

  const fromVersion =
    fromVersionId === "current"
      ? { _id: "current", label: "Current", code: project.generatedCode || "" }
      : (project.versions || []).find((item) => String(item._id) === String(fromVersionId));
  const toVersion =
    toVersionId === "current"
      ? { _id: "current", label: "Current", code: project.generatedCode || "" }
      : (project.versions || []).find((item) => String(item._id) === String(toVersionId));

  if (!fromVersion || !toVersion) {
    throw new AppError("Versions for comparison were not found.", 404, "VERSION_NOT_FOUND");
  }

  return sendSuccess(res, {
    message: "Version comparison prepared.",
    data: {
      fromVersion,
      toVersion,
      diffSummary: summarizeDiff(fromVersion.code, toVersion.code),
    },
  });
});

const deleteVersion = asyncHandler(async (req, res) => {
  const project = await getProjectForUser(req.user._id, req.params.projectId);
  const versionId = String(req.params.versionId);
  project.versions = (project.versions || []).filter((item) => String(item._id) !== versionId);
  project.favoriteVersions = (project.favoriteVersions || []).filter((id) => id !== versionId);
  await project.save();

  return sendSuccess(res, {
    message: "Version deleted.",
    data: { versions: project.versions },
  });
});

const toggleFavoriteVersion = asyncHandler(async (req, res) => {
  const project = await getProjectForUser(req.user._id, req.params.projectId);
  const versionId = String(req.params.versionId);
  const version = (project.versions || []).find((item) => String(item._id) === versionId);
  if (!version) {
    throw new AppError("Version not found.", 404, "VERSION_NOT_FOUND");
  }

  version.isFavorite = !version.isFavorite;
  if (version.isFavorite) {
    project.favoriteVersions = [...new Set([versionId, ...(project.favoriteVersions || [])])];
  } else {
    project.favoriteVersions = (project.favoriteVersions || []).filter((id) => id !== versionId);
  }
  await project.save();

  return sendSuccess(res, {
    message: version.isFavorite ? "Version favorited." : "Version unfavorited.",
    data: { version, favoriteVersions: project.favoriteVersions },
  });
});

module.exports = {
  listVersions,
  saveCheckpoint,
  restoreVersion,
  compareVersions,
  deleteVersion,
  toggleFavoriteVersion,
};

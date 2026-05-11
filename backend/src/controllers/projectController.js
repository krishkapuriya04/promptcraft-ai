const Project = require("../models/Project");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const { buildPagination, buildProjectQuery, buildProjectSort } = require("../utils/projectQuery");
const {
  createVersionSnapshot,
  pruneVersions,
  shouldCreateSnapshot,
  summarizeDiff,
} = require("../utils/versioning");
const { trackActivity } = require("../utils/activityTracker");

const createProject = asyncHandler(async (req, res) => {
  const { name, prompt, category, theme, description, generatedCode, generatedHtml, thumbnail, tags = [] } = req.body;
  const project = await Project.create({
    userId: req.user._id,
    name: name?.trim() || "Untitled Project",
    prompt: prompt?.trim() || "No prompt provided.",
    category: category || "SaaS",
    theme: theme || "Modern Gradient",
    description: description || "",
    generatedCode: generatedCode || "",
    generatedHtml: generatedHtml || generatedCode || "",
    thumbnail: thumbnail || "",
    tags,
    status: "ready",
    lastOpenedAt: new Date(),
    versions: [
      createVersionSnapshot({
        code: generatedCode || generatedHtml || "",
        summary: "Initial generated version.",
        label: "v1",
      }),
    ],
  });
  trackActivity({
    userId: req.user._id,
    projectId: project._id,
    type: "project_create",
    metadata: { category: project.category, theme: project.theme },
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: "Project created successfully.",
    data: { project },
  });
});

const getProjects = asyncHandler(async (req, res) => {
  const filters = buildProjectQuery({ userId: req.user._id, query: req.query });
  const { page, limit, skip } = buildPagination(req.query);
  const sort = buildProjectSort(req.query.sortBy, req.query.sortOrder);

  const [projects, total] = await Promise.all([
    Project.find(filters).sort(sort).skip(skip).limit(limit),
    Project.countDocuments(filters),
  ]);

  return sendSuccess(res, {
    message: "Projects fetched successfully.",
    data: {
      projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    },
  });
});

const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, userId: req.user._id });
  if (!project) {
    throw new AppError("Project not found.", 404, "PROJECT_NOT_FOUND");
  }

  project.lastOpenedAt = new Date();
  await project.save();
  trackActivity({
    userId: req.user._id,
    projectId: project._id,
    type: "project_open",
    metadata: { version: project.version },
  });

  return sendSuccess(res, {
    message: "Project fetched successfully.",
    data: { project },
  });
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, userId: req.user._id });
  if (!project) {
    throw new AppError("Project not found.", 404, "PROJECT_NOT_FOUND");
  }

  const previousCode = project.generatedCode || "";
  const allowedFields = [
    "name",
    "description",
    "category",
    "theme",
    "thumbnail",
    "tags",
    "prompt",
    "generatedCode",
    "generatedHtml",
    "optimizationHistory",
  ];
  for (const field of allowedFields) {
    if (Object.hasOwn(req.body, field)) {
      project[field] = req.body[field];
    }
  }

  const nextCode = project.generatedCode || "";
  if (shouldCreateSnapshot(previousCode, nextCode)) {
    const snapshot = createVersionSnapshot({
      code: nextCode,
      summary: summarizeDiff(previousCode, nextCode),
      label: `v${(project.version || 1) + 1}`,
      note: req.body.versionNote || "",
      isCheckpoint: Boolean(req.body.isCheckpoint),
    });
    project.versions = pruneVersions([snapshot, ...(project.versions || [])]);
    if (snapshot.isFavorite) {
      project.favoriteVersions = [...new Set([String(snapshot._id), ...(project.favoriteVersions || [])])];
    }
  }
  await project.save();
  trackActivity({
    userId: req.user._id,
    projectId: project._id,
    type: "editor_save",
    metadata: { version: project.version },
  });

  return sendSuccess(res, {
    message: "Project updated successfully.",
    data: { project },
  });
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  trackActivity({
    userId: req.user._id,
    projectId: req.params.id,
    type: "project_delete",
  });
  if (!project) {
    throw new AppError("Project not found.", 404, "PROJECT_NOT_FOUND");
  }

  return sendSuccess(res, {
    message: "Project deleted successfully.",
    data: { deletedId: req.params.id },
  });
});

const toggleFavoriteProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, userId: req.user._id });
  if (!project) {
    throw new AppError("Project not found.", 404, "PROJECT_NOT_FOUND");
  }
  project.isFavorite = !project.isFavorite;
  await project.save();
  trackActivity({
    userId: req.user._id,
    projectId: project._id,
    type: "project_favorite_toggle",
    metadata: { isFavorite: project.isFavorite },
  });

  return sendSuccess(res, {
    message: project.isFavorite ? "Project added to favorites." : "Project removed from favorites.",
    data: { project },
  });
});

const duplicateProject = asyncHandler(async (req, res) => {
  const sourceProject = await Project.findOne({ _id: req.params.id, userId: req.user._id });
  if (!sourceProject) {
    throw new AppError("Project not found.", 404, "PROJECT_NOT_FOUND");
  }

  const duplicate = await Project.create({
    userId: sourceProject.userId,
    name: `${sourceProject.name} (Copy)`,
    prompt: sourceProject.prompt,
    category: sourceProject.category,
    theme: sourceProject.theme,
    description: sourceProject.description,
    generatedCode: sourceProject.generatedCode,
    generatedHtml: sourceProject.generatedHtml,
    thumbnail: sourceProject.thumbnail,
    tags: sourceProject.tags,
    status: sourceProject.status,
    version: sourceProject.version + 1,
  });
  trackActivity({
    userId: req.user._id,
    projectId: duplicate._id,
    type: "project_duplicate",
    metadata: { sourceProjectId: sourceProject._id },
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: "Project duplicated successfully.",
    data: { project: duplicate },
  });
});

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  toggleFavoriteProject,
  duplicateProject,
};

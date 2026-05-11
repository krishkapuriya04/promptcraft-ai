const Project = require("../models/Project");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const { DEPLOYMENT_PROVIDERS } = require("../constants/deploymentProviders");
const { validateDeploymentPayload } = require("../utils/deploymentValidation");
const { getDeployment, startDeployment } = require("../services/deploymentService");
const { trackActivity } = require("../utils/activityTracker");

async function getProjectForUser(userId, projectId) {
  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) {
    throw new AppError("Project not found.", 404, "PROJECT_NOT_FOUND");
  }
  return project;
}

const getDeploymentProviders = asyncHandler(async (_req, res) =>
  sendSuccess(res, {
    message: "Deployment providers fetched.",
    data: { providers: Object.values(DEPLOYMENT_PROVIDERS) },
  })
);

const createDeployment = asyncHandler(async (req, res) => {
  const project = await getProjectForUser(req.user._id, req.params.projectId);
  const provider = req.body.provider || DEPLOYMENT_PROVIDERS.MOCK;
  validateDeploymentPayload({ provider });

  const deploymentId = await startDeployment({
    project,
    provider,
    sourceVersion: req.body.sourceVersion || project.version || 1,
  });
  trackActivity({
    userId: req.user._id,
    projectId: project._id,
    type: "project_deploy",
    metadata: { provider, sourceVersion: req.body.sourceVersion || project.version || 1 },
  });

  return sendSuccess(res, {
    statusCode: 202,
    message: "Deployment started.",
    data: { deploymentId },
  });
});

const getDeploymentStatus = asyncHandler(async (req, res) => {
  const project = await getProjectForUser(req.user._id, req.params.projectId);
  const deployment = await getDeployment(project, req.params.deploymentId);
  return sendSuccess(res, {
    message: "Deployment status fetched.",
    data: { deployment },
  });
});

const listDeployments = asyncHandler(async (req, res) => {
  const project = await getProjectForUser(req.user._id, req.params.projectId);
  return sendSuccess(res, {
    message: "Deployment history fetched.",
    data: {
      deployments: project.deployments || [],
      deploymentStatus: project.deploymentStatus,
      deploymentUrl: project.deploymentUrl,
    },
  });
});

const redeploy = asyncHandler(async (req, res) => {
  const project = await getProjectForUser(req.user._id, req.params.projectId);
  const previous = await getDeployment(project, req.params.deploymentId);
  const deploymentId = await startDeployment({
    project,
    provider: previous.provider || DEPLOYMENT_PROVIDERS.MOCK,
    sourceVersion: previous.sourceVersion || project.version,
  });
  trackActivity({
    userId: req.user._id,
    projectId: project._id,
    type: "project_redeploy",
    metadata: { provider: previous.provider, sourceVersion: previous.sourceVersion || project.version },
  });
  return sendSuccess(res, {
    statusCode: 202,
    message: "Redeployment started.",
    data: { deploymentId },
  });
});

module.exports = {
  getDeploymentProviders,
  createDeployment,
  getDeploymentStatus,
  listDeployments,
  redeploy,
};

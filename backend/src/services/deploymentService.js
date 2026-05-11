const crypto = require("crypto");
const Project = require("../models/Project");
const AppError = require("../utils/AppError");
const { createMockLogs, createMockUrl } = require("../adapters/deployment/mockProvider");

const deploymentTimers = new Map();

async function updateDeploymentState(projectId, deploymentId, updater) {
  const project = await Project.findById(projectId);
  if (!project) return;
  const deployment = (project.deployments || []).find((item) => item.deploymentId === deploymentId);
  if (!deployment) return;
  updater(deployment, project);
  await project.save();
}

function scheduleLifecycle({ projectId, deploymentId, provider }) {
  const logs = createMockLogs(provider);
  const steps = [
    { status: "building", log: logs[1], delay: 700 },
    { status: "deploying", log: logs[3], delay: 1600 },
    { status: "ready", log: logs[4], delay: 2600 },
  ];

  steps.forEach((step) => {
    const timer = setTimeout(async () => {
      await updateDeploymentState(projectId, deploymentId, (deployment, project) => {
        deployment.status = step.status;
        deployment.logs.push(step.log);
        if (step.status === "ready") {
          deployment.deployedAt = new Date();
          deployment.url = createMockUrl(project.name, provider, deploymentId.slice(0, 8));
          project.deploymentStatus = "ready";
          project.deploymentUrl = deployment.url;
        } else {
          project.deploymentStatus = step.status;
        }
      });
    }, step.delay);
    deploymentTimers.set(`${projectId}-${deploymentId}-${step.status}`, timer);
  });
}

async function startDeployment({ project, provider, sourceVersion }) {
  const deploymentId = crypto.randomUUID();
  const queuedLog = `[${provider}] Deployment queued`;
  const buildLog = `[${provider}] Build environment initialized`;

  project.deployments = [
    {
      deploymentId,
      provider,
      status: "queued",
      url: "",
      logs: [queuedLog, buildLog],
      sourceVersion,
    },
    ...(project.deployments || []),
  ].slice(0, 50);
  project.deploymentProvider = provider;
  project.deploymentStatus = "queued";
  await project.save();

  scheduleLifecycle({ projectId: String(project._id), deploymentId, provider });
  return deploymentId;
}

async function getDeployment(project, deploymentId) {
  const deployment = (project.deployments || []).find((item) => item.deploymentId === deploymentId);
  if (!deployment) {
    throw new AppError("Deployment not found.", 404, "DEPLOYMENT_NOT_FOUND");
  }
  return deployment;
}

module.exports = { startDeployment, getDeployment };

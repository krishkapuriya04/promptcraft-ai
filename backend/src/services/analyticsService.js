const ActivityEvent = require("../models/ActivityEvent");
const Project = require("../models/Project");

const cache = new Map();
const CACHE_TTL_MS = 60 * 1000;

function getCacheKey(userId, dateFrom, dateTo) {
  return `${userId}:${dateFrom || "none"}:${dateTo || "none"}`;
}

function getDateRange(dateFrom, dateTo) {
  const range = {};
  if (dateFrom) range.$gte = new Date(dateFrom);
  if (dateTo) range.$lte = new Date(dateTo);
  return Object.keys(range).length ? range : null;
}

async function aggregateAnalytics({ userId, dateFrom, dateTo }) {
  const key = getCacheKey(userId, dateFrom, dateTo);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.data;
  }

  const dateRange = getDateRange(dateFrom, dateTo);
  const eventMatch = { userId };
  if (dateRange) eventMatch.createdAt = dateRange;
  const projectMatch = { userId };
  if (dateRange) projectMatch.createdAt = dateRange;

  const [totalProjects, favoriteProjects, eventCounts, trendData, recentActivity, topProjects, recentDeployments, checkpointVersions] =
    await Promise.all([
      Project.countDocuments(projectMatch),
      Project.countDocuments({ ...projectMatch, isFavorite: true }),
      ActivityEvent.aggregate([
        { $match: eventMatch },
        { $group: { _id: "$type", count: { $sum: 1 } } },
      ]),
      ActivityEvent.aggregate([
        { $match: eventMatch },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      ActivityEvent.find(eventMatch).sort({ createdAt: -1 }).limit(20).lean(),
      ActivityEvent.aggregate([
        { $match: { ...eventMatch, projectId: { $ne: null } } },
        { $group: { _id: "$projectId", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "projects",
            localField: "_id",
            foreignField: "_id",
            as: "project",
          },
        },
        { $unwind: "$project" },
        { $project: { _id: 1, count: 1, name: "$project.name", category: "$project.category" } },
      ]),
      Project.aggregate([
        { $match: projectMatch },
        { $unwind: "$deployments" },
        { $sort: { "deployments.createdAt": -1 } },
        { $limit: 8 },
        {
          $project: {
            projectId: "$_id",
            projectName: "$name",
            deploymentId: "$deployments.deploymentId",
            provider: "$deployments.provider",
            status: "$deployments.status",
            url: "$deployments.url",
            deployedAt: "$deployments.deployedAt",
          },
        },
      ]),
      Project.aggregate([
        { $match: projectMatch },
        { $unwind: "$versions" },
        { $match: { "versions.isCheckpoint": true } },
        { $count: "total" },
      ]),
    ]);

  const countsByType = Object.fromEntries(eventCounts.map((item) => [item._id, item.count]));
  const result = {
    overview: {
      totalProjects,
      totalAIGenerations: countsByType.ai_generation || 0,
      screenshotGenerations: countsByType.screenshot_generation || 0,
      totalExports: countsByType.project_export || 0,
      deploymentsCount: countsByType.project_deploy || 0,
      favoriteProjects,
      activeEditingTime: countsByType.editor_save || 0,
      recentActivityCounts: recentActivity.length,
      versionCheckpoints: checkpointVersions[0]?.total || 0,
    },
    trends: trendData.map((item) => ({ date: item._id, value: item.count })),
    typeBreakdown: [
      { name: "AI", value: countsByType.ai_generation || 0 },
      { name: "Screenshot", value: countsByType.screenshot_generation || 0 },
      { name: "Export", value: countsByType.project_export || 0 },
      { name: "Deploy", value: countsByType.project_deploy || 0 },
      { name: "Checkpoint", value: countsByType.version_checkpoint || 0 },
    ],
    recentActivity,
    topProjects,
    recentDeployments,
  };

  cache.set(key, { ts: Date.now(), data: result });
  return result;
}

module.exports = { aggregateAnalytics };

function createMockUrl(projectName, provider, deploymentId) {
  const slug = (projectName || "project").toLowerCase().replace(/[^a-z0-9-]/g, "-");
  return `https://${slug}-${deploymentId}.${provider}.promptcraft.dev`;
}

function createMockLogs(provider) {
  return [
    `[${provider}] Build environment initialized`,
    `[${provider}] Installing dependencies`,
    `[${provider}] Building React/Vite bundle`,
    `[${provider}] Uploading artifacts`,
    `[${provider}] Deployment finalized`,
  ];
}

module.exports = { createMockUrl, createMockLogs };

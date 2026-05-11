const AppError = require("./AppError");
const { DEPLOYMENT_PROVIDERS } = require("../constants/deploymentProviders");

function validateDeploymentPayload({ provider }) {
  const allowed = Object.values(DEPLOYMENT_PROVIDERS);
  if (!allowed.includes(provider)) {
    throw new AppError("Invalid deployment provider.", 400, "VALIDATION_ERROR");
  }
}

module.exports = { validateDeploymentPayload };

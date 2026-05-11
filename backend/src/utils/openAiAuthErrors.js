const { AuthenticationError } = require("openai/core/error");

function isAuthLikeOpenAiFailure(error) {
  if (error instanceof AuthenticationError) return true;

  const status = error?.status ?? error?.response?.status ?? error?.statusCode;
  const code = String(error?.code || error?.error?.code || "").toLowerCase();
  const msg = String(error?.message || "").toLowerCase();

  if (status === 401) return true;
  if (code === "invalid_api_key") return true;
  if (msg.includes("incorrect api key") || msg.includes("invalid api key")) return true;
  if (msg.includes("invalid authorization")) return true;
  if (msg.includes("you didn't provide an api key") || msg.includes("no api key")) return true;
  return false;
}

module.exports = { isAuthLikeOpenAiFailure };

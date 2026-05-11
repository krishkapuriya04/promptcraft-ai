/**
 * Validates required environment variables before the server accepts traffic.
 * In production, missing secrets fail fast to avoid running with insecure defaults.
 */
function validateEnv() {
  const isProd = process.env.NODE_ENV === "production";
  const required = ["MONGODB_URI", "JWT_SECRET", "CLIENT_URL"];
  // OPENAI_API_KEY is optional: demo generation runs when the key is missing or placeholder.

  const missing = required.filter((key) => !process.env[key] || String(process.env[key]).trim() === "");

  if (missing.length > 0) {
    console.error(`[env] Missing required variables: ${missing.join(", ")}`);
    process.exit(1);
  }

  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32 && isProd) {
    console.error("[env] JWT_SECRET should be at least 32 characters in production.");
    process.exit(1);
  }
}

module.exports = { validateEnv };

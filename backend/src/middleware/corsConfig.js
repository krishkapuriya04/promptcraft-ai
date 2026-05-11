const cors = require("cors");

function normalizeOrigin(origin) {
  if (!origin || typeof origin !== "string") return "";
  return origin.trim().replace(/\/+$/, "");
}

/**
 * CORS: production uses CLIENT_URL only (normalized, no trailing slash).
 * Development also allows http(s)://localhost or 127.0.0.1 on any port so Vite
 * matches even when CLIENT_URL uses "localhost" but the browser shows "127.0.0.1" (or vice versa).
 */
function corsMiddleware() {
  const isProd = process.env.NODE_ENV === "production";

  return cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      const requestOrigin = normalizeOrigin(origin);
      const configured = normalizeOrigin(process.env.CLIENT_URL || "");

      if (configured && requestOrigin === configured) {
        return callback(null, true);
      }

      if (!isProd) {
        if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(requestOrigin)) {
          return callback(null, true);
        }
      }

      return callback(null, false);
    },
    credentials: true,
  });
}

module.exports = { corsMiddleware };

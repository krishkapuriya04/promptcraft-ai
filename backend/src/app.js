const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { corsMiddleware } = require("./middleware/corsConfig");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const routes = require("./routes");

const app = express();

const isProd = process.env.NODE_ENV === "production";

if (process.env.TRUST_PROXY === "1") {
  app.set("trust proxy", 1);
}

app.use(
  helmet({
    contentSecurityPolicy: isProd ? undefined : false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(corsMiddleware());
app.use(express.json({ limit: "2mb" }));
app.disable("x-powered-by");

// Avoid logging Authorization headers or bodies in production.
app.use(
  morgan(isProd ? "tiny" : "dev", {
    skip: (req) => req.path === "/health" || req.path === "/api/health",
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    message: { success: false, message: "Too many requests, please try again later." },
    skip: (req) => req.path === "/health" || req.path === "/api/health",
  })
);

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "PromptCraft API healthy." });
});

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

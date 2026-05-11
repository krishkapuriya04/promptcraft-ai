function notFound(req, res, next) {
  const message =
    process.env.NODE_ENV === "production" ? "Resource not found." : `Route not found: ${req.originalUrl}`;
  const error = new Error(message);
  res.status(404);
  next(error);
}

const { getClientSafeMessage } = require("../utils/safeErrorMessage");

function normalizeMongooseErrors(err) {
  if (err.statusCode) {
    return;
  }
  if (err.name === "CastError") {
    err.statusCode = 400;
    err.code = "INVALID_ID";
    err.message = "Invalid resource identifier.";
  }
  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.code = "VALIDATION_ERROR";
    if (process.env.NODE_ENV === "production") {
      err.message = "Validation failed.";
    }
  }
  if (err.code === 11000) {
    err.statusCode = 409;
    err.code = "DUPLICATE_KEY";
    err.message = "This record already exists.";
  }
}

function errorHandler(err, req, res, _next) {
  normalizeMongooseErrors(err);
  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  const safeMessage = getClientSafeMessage(err, statusCode);

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error("[error]", req.method, req.originalUrl, statusCode, err.message);
  } else {
    // eslint-disable-next-line no-console
    console.error("[error]", req.method, req.originalUrl, statusCode, err.code || "ERROR");
  }

  res.status(statusCode).json({
    success: false,
    code: err.code || "INTERNAL_SERVER_ERROR",
    message: safeMessage,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
}

module.exports = { notFound, errorHandler };

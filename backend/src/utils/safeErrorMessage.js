/**
 * Maps internal errors to client-safe messages in production.
 * Prevents leaking stack traces, Mongo paths, or implementation details.
 */
function getClientSafeMessage(err, statusCode) {
  if (process.env.NODE_ENV !== "production") {
    return err.message || "Internal server error";
  }

  if (statusCode >= 500) {
    return "Something went wrong. Please try again later.";
  }

  return err.message || "Request could not be completed.";
}

module.exports = { getClientSafeMessage };

function sendSuccess(res, { statusCode = 200, message = "Success", data = null }) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

/** Auth endpoints return token + user at the top level for a stable SPA contract. */
function sendAuthSuccess(res, { statusCode = 200, message = "Success", token, user }) {
  return res.status(statusCode).json({
    success: true,
    message,
    token,
    user,
  });
}

module.exports = { sendSuccess, sendAuthSuccess };

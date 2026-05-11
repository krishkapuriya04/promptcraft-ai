const ActivityEvent = require("../models/ActivityEvent");

async function trackActivity({ userId, projectId = null, type, metadata = {} }) {
  try {
    await ActivityEvent.create({ userId, projectId, type, metadata });
  } catch {
    // Analytics events must not block main user flow.
  }
}

module.exports = { trackActivity };

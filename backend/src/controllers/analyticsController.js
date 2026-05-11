const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const { aggregateAnalytics } = require("../services/analyticsService");

const getAnalyticsSummary = asyncHandler(async (req, res) => {
  const data = await aggregateAnalytics({
    userId: req.user._id,
    dateFrom: req.query.dateFrom,
    dateTo: req.query.dateTo,
  });

  return sendSuccess(res, {
    message: "Analytics summary fetched.",
    data,
  });
});

module.exports = { getAnalyticsSummary };

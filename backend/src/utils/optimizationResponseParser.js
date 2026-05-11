const AppError = require("./AppError");

function parseOptimizationResponse(rawContent) {
  try {
    const start = rawContent.indexOf("{");
    const end = rawContent.lastIndexOf("}");
    const parsed = JSON.parse(rawContent.slice(start, end + 1));

    if (!parsed.optimizedCode || !Array.isArray(parsed.suggestions)) {
      throw new Error("Malformed optimization response.");
    }
    return {
      optimizedCode: parsed.optimizedCode,
      summary: parsed.summary || "UI optimization complete.",
      suggestions: parsed.suggestions,
    };
  } catch {
    throw new AppError("Failed to parse optimization response from AI.", 502, "AI_PARSE_ERROR");
  }
}

module.exports = { parseOptimizationResponse };

const AppError = require("./AppError");

function parseJsonResponse(rawContent) {
  try {
    const jsonStart = rawContent.indexOf("{");
    const jsonEnd = rawContent.lastIndexOf("}");
    const candidate = rawContent.slice(jsonStart, jsonEnd + 1);
    const parsed = JSON.parse(candidate);

    if (!parsed.title || !parsed.description || !parsed.category || !parsed.generatedCode) {
      throw new Error("Missing required generation fields.");
    }
    if (!Array.isArray(parsed.detectedSections)) {
      parsed.detectedSections = [];
    }
    return parsed;
  } catch {
    throw new AppError("Failed to parse AI generation response.", 502, "AI_PARSE_ERROR");
  }
}

module.exports = { parseJsonResponse };

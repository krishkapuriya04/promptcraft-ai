const AppError = require("./AppError");

function parseScreenshotResponse(rawContent) {
  try {
    const start = rawContent.indexOf("{");
    const end = rawContent.lastIndexOf("}");
    const parsed = JSON.parse(rawContent.slice(start, end + 1));

    if (!parsed.generatedCode || !parsed.detectedDesignSummary) {
      throw new Error("Missing required screenshot generation fields.");
    }

    return {
      title: parsed.title || "Screenshot Generated Website",
      description: parsed.description || "Generated from screenshot analysis.",
      detectedDesignSummary: parsed.detectedDesignSummary,
      detectedColors: Array.isArray(parsed.detectedColors) ? parsed.detectedColors : [],
      detectedSections: Array.isArray(parsed.detectedSections) ? parsed.detectedSections : [],
      generatedCode: parsed.generatedCode,
    };
  } catch {
    throw new AppError("Failed to parse screenshot generation response.", 502, "AI_PARSE_ERROR");
  }
}

module.exports = { parseScreenshotResponse };

const OpenAI = require("openai");
const AppError = require("../utils/AppError");
const { buildOptimizationPrompt } = require("../utils/optimizationPromptBuilder");
const { parseOptimizationResponse } = require("../utils/optimizationResponseParser");

async function optimizeUiCode({ code, categories }) {
  if (!process.env.OPENAI_API_KEY) {
    throw new AppError("OPENAI_API_KEY is not configured.", 500, "AI_CONFIGURATION_ERROR");
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: buildOptimizationPrompt({ code, categories }),
      temperature: 0.5,
      max_output_tokens: 2200,
    });
    const raw = response.output_text || "";
    if (!raw) {
      throw new AppError("Optimization returned empty response.", 502, "AI_EMPTY_RESPONSE");
    }
    return parseOptimizationResponse(raw);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("AI optimization request failed.", 502, "AI_PROVIDER_ERROR");
  }
}

module.exports = { optimizeUiCode };

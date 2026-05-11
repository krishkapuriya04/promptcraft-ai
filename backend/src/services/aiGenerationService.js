const AppError = require("../utils/AppError");
const { isOpenAiConfigured } = require("../config/aiMode");
const { isAuthLikeOpenAiFailure } = require("../utils/openAiAuthErrors");
const { buildDemoGeneration } = require("./demoGenerationService");
const { buildWebsiteGenerationPrompt } = require("../utils/aiPromptBuilder");
const { parseJsonResponse } = require("../utils/aiResponseParser");

const isDev = process.env.NODE_ENV !== "production";

function normalizeGenerationResult(parsed, { demoMode }) {
  return {
    title: parsed.title,
    description: parsed.description,
    category: parsed.category,
    generatedCode: parsed.generatedCode,
    detectedSections: Array.isArray(parsed.detectedSections) ? parsed.detectedSections : [],
    demoMode: Boolean(demoMode),
  };
}

async function generateWebsiteWithAI({ prompt, category, theme }) {
  if (!isOpenAiConfigured()) {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn("[AI MODE] Demo mode active");
    }
    return buildDemoGeneration({ prompt, category, theme });
  }

  if (isDev) {
    // eslint-disable-next-line no-console
    console.warn("[AI MODE] OpenAI mode active");
  }

  const OpenAI = require("openai");
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY.trim(),
  });

  try {
    const completion = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: buildWebsiteGenerationPrompt({ prompt, category, theme }),
      temperature: 0.7,
      max_output_tokens: 1800,
    });

    const rawContent = completion.output_text || "";
    if (!rawContent) {
      throw new AppError("AI generation returned an empty response.", 502, "AI_EMPTY_RESPONSE");
    }

    const parsed = parseJsonResponse(rawContent);
    return normalizeGenerationResult(parsed, { demoMode: false });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    if (isAuthLikeOpenAiFailure(error)) {
      if (isDev) {
        // eslint-disable-next-line no-console
        console.warn("[AI MODE] OpenAI request failed; falling back to demo.", error?.message || error?.code);
      }
      return buildDemoGeneration({ prompt, category, theme });
    }

    throw new AppError("AI provider request failed. Please retry.", 502, "AI_PROVIDER_ERROR");
  }
}

module.exports = { generateWebsiteWithAI };

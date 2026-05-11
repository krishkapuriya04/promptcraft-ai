const sharp = require("sharp");
const AppError = require("../utils/AppError");
const { isOpenAiConfigured } = require("../config/aiMode");
const { isAuthLikeOpenAiFailure } = require("../utils/openAiAuthErrors");
const { generateDemoScreenshotAnalysis } = require("./demoScreenshotGenerationService");
const { buildScreenshotGenerationPrompt } = require("../utils/screenshotPromptBuilder");
const { parseScreenshotResponse } = require("../utils/screenshotResponseParser");

const isDev = process.env.NODE_ENV !== "production";

async function optimizeImageBuffer(inputBuffer) {
  return sharp(inputBuffer).rotate().resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 82 }).toBuffer();
}

async function generateFromScreenshot({ imageBuffer, mimeType = "image/jpeg", originalName = "upload" }) {
  if (!isOpenAiConfigured()) {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn("[SCREENSHOT AI] Demo mode active");
    }
    return generateDemoScreenshotAnalysis({ imageBuffer, mimeType, originalName });
  }

  const optimized = await optimizeImageBuffer(imageBuffer);
  const base64 = optimized.toString("base64");
  const dataUrl = `data:${mimeType};base64,${base64}`;

  const OpenAI = require("openai");
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY.trim() });

  try {
    const completion = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: buildScreenshotGenerationPrompt() },
            { type: "input_image", image_url: dataUrl },
          ],
        },
      ],
      max_output_tokens: 2200,
    });

    const raw = completion.output_text || "";
    if (!raw) {
      throw new AppError("Screenshot analysis returned empty response.", 502, "AI_EMPTY_RESPONSE");
    }

    return { ...parseScreenshotResponse(raw), demoMode: false };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    if (isDev) {
      const hint = isAuthLikeOpenAiFailure(error) ? "auth/invalid key" : "provider/network";
      // eslint-disable-next-line no-console
      console.warn("[SCREENSHOT AI] Vision request failed → fallback to demo", `(${hint})`, error?.message || error?.code);
    }

    return generateDemoScreenshotAnalysis({ imageBuffer, mimeType, originalName });
  }
}

module.exports = { generateFromScreenshot };

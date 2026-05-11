/**
 * OpenAI is considered configured only when a plausible live key is present.
 * Missing, placeholder, whitespace-only, too-short, or non-sk keys → demo generation.
 */
function isOpenAiConfigured() {
  const raw = (process.env.OPENAI_API_KEY || "").trim();
  if (!raw) return false;
  if (raw.length < 8) return false;

  const lower = raw.toLowerCase();
  if (
    /^(replace|sk-your|changeme|xxx|placeholder|dummy|fake|null|undefined|insert|your[_-]?api[_-]?key|apikey|test|none|false|0)$/i.test(
      lower
    )
  ) {
    return false;
  }
  if (/^(replace|sk-your|changeme|xxx|placeholder|dummy|fake|insert|your-api|test-key)/i.test(raw)) {
    return false;
  }

  // Real OpenAI API keys are sk-… (often sk-proj-…) and are much longer than placeholder strings.
  if (!/^sk-/i.test(raw)) {
    return false;
  }
  if (raw.length < 51) {
    return false;
  }

  return true;
}

function isDemoGenerationMode() {
  return !isOpenAiConfigured();
}

module.exports = { isOpenAiConfigured, isDemoGenerationMode };

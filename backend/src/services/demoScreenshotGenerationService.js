const sharp = require("sharp");
const { buildDemoGeneration } = require("./demoGenerationService");

const LAYOUT_CONFIG = {
  dashboard: {
    category: "SaaS",
    promptExtra:
      "wide analytics dashboard interface with charts tables sidebar navigation metrics cards and KPI widgets as seen in the screenshot.",
  },
  saas: {
    category: "SaaS",
    promptExtra:
      "modern SaaS marketing or product UI with hero sections navigation pricing tables and conversion-focused layout from the screenshot.",
  },
  gym: {
    category: "Gym",
    promptExtra: "fitness gym landing page with training programs coaches schedules and membership call to action.",
  },
  ecommerce: {
    category: "Ecommerce",
    promptExtra: "e-commerce storefront with product grid cart promotions and shopping-focused layout.",
  },
  portfolio: {
    category: "Portfolio",
    promptExtra: "creative portfolio or personal site with work showcase contact and minimal editorial layout.",
  },
  restaurant: {
    category: "Restaurant",
    promptExtra: "restaurant or hospitality site with menu hero reservations and dining atmosphere.",
  },
};

const COLOR_PRESETS = {
  dashboard: ["#0f172a", "#1e293b", "#6366f1", "#94a3b8", "#e2e8f0"],
  saas: ["#020617", "#312e81", "#7c3aed", "#a5b4fc", "#f8fafc"],
  gym: ["#022c22", "#064e3b", "#10b981", "#6ee7b7", "#ecfdf5"],
  ecommerce: ["#0f172a", "#14532d", "#22c55e", "#bbf7d0", "#fefce8"],
  portfolio: ["#18181b", "#3f3f46", "#fafafa", "#a1a1aa", "#27272a"],
  restaurant: ["#1c1917", "#431407", "#ea580c", "#fed7aa", "#fffbeb"],
};

const LAYOUT_RULES = [
  { id: "dashboard", keywords: ["dashboard", "admin", "console", "analytics", "panel", "metrics", "kpi", "report", "grid"] },
  { id: "gym", keywords: ["gym", "fitness", "workout", "trainer", "lift", "yoga", "crossfit"] },
  { id: "ecommerce", keywords: ["shop", "store", "cart", "product", "checkout", "catalog", "sale", "buy", "ecom"] },
  { id: "portfolio", keywords: ["portfolio", "resume", "cv", "creative", "gallery", "about", "photographer"] },
  { id: "restaurant", keywords: ["restaurant", "menu", "food", "dining", "chef", "cafe", "kitchen", "bistro"] },
  { id: "saas", keywords: ["saas", "landing", "pricing", "signup", "hero", "app", "ui", "mock", "wireframe", "frame", "screen"] },
];

function inferLayoutId(originalName, width, height) {
  const name = String(originalName || "upload")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ");
  const ratio = width > 0 && height > 0 ? width / height : 1.4;

  let bestId = "saas";
  let bestScore = 0;

  for (const rule of LAYOUT_RULES) {
    let score = 0;
    for (const kw of rule.keywords) {
      if (name.includes(kw)) score += 4;
    }
    if (rule.id === "dashboard" && ratio >= 1.45) score += 6;
    if (rule.id === "portfolio" && ratio <= 0.78) score += 4;
    if (rule.id === "ecommerce" && ratio > 1.1 && ratio < 1.5) score += 1;
    if (score > bestScore) {
      bestScore = score;
      bestId = rule.id;
    }
  }

  if (bestScore === 0 && ratio >= 1.55) {
    return "dashboard";
  }
  if (bestScore === 0 && ratio <= 0.72) {
    return "portfolio";
  }

  return bestId;
}

/**
 * Local screenshot “analysis” when OpenAI vision is unavailable or fails.
 * Reuses demo website templates via buildDemoGeneration.
 */
async function safeImageMetadata(buffer) {
  try {
    return await sharp(buffer).metadata();
  } catch {
    return { width: 0, height: 0 };
  }
}

async function generateDemoScreenshotAnalysis({ imageBuffer, mimeType: _mimeType, originalName }) {
  const meta = await safeImageMetadata(imageBuffer);
  const width = meta.width || 0;
  const height = meta.height || 0;
  const layoutId = inferLayoutId(originalName, width, height);
  const cfg = LAYOUT_CONFIG[layoutId] || LAYOUT_CONFIG.saas;

  const prompt = [
    `Screenshot-derived UI (${layoutId}).`,
    `Source file: ${originalName || "upload"}.`,
    `Raster dimensions: ${width}x${height}px.`,
    cfg.promptExtra,
    "xxxxxxxxxxxxxxxxxxxx",
  ].join(" ");

  const gen = await buildDemoGeneration({
    prompt,
    category: cfg.category,
    theme: "Modern Gradient",
  });

  const ratio = width > 0 && height > 0 ? (width / height).toFixed(2) : "n/a";
  const summary = `Demo: ${layoutId} layout inferred from filename and ${width}×${height}px frame (aspect ${ratio}). Template reuse: ${gen.title}.`;

  return {
    title: `${gen.title} (screenshot demo)`,
    description: gen.description,
    generatedCode: gen.generatedCode,
    detectedDesignSummary: summary,
    detectedColors: COLOR_PRESETS[layoutId] || COLOR_PRESETS.saas,
    detectedSections: gen.detectedSections?.length ? gen.detectedSections : ["Hero", "Content", "CTA"],
    demoMode: true,
  };
}

module.exports = { generateDemoScreenshotAnalysis, inferLayoutId };

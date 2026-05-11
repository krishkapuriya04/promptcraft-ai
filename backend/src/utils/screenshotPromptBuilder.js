function buildScreenshotGenerationPrompt() {
  return `
Analyze the uploaded website screenshot and generate production-quality React + Tailwind code.

Return STRICT JSON only:
{
  "title": "string",
  "description": "string",
  "detectedDesignSummary": "string",
  "detectedColors": ["#hex", "#hex"],
  "detectedSections": ["string"],
  "generatedCode": "string"
}

Requirements:
1. Recreate layout hierarchy, spacing, typography rhythm, and visual style.
2. Include responsive behavior for mobile/tablet/desktop.
3. Use modern accessible semantics and clear React component structure.
4. generatedCode should be valid React JSX using Tailwind classes.
5. Do not include markdown/backticks.
`;
}

module.exports = { buildScreenshotGenerationPrompt };

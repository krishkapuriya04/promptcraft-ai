function buildWebsiteGenerationPrompt({ prompt, category, theme }) {
  return `
You are an expert frontend engineer and product designer.
Generate a premium, production-style React + Tailwind website component.

User requirements:
- Website category: ${category}
- Theme style: ${theme}
- Prompt intent: ${prompt}

Rules:
1. Output ONLY valid JSON (no markdown, no backticks).
2. JSON schema:
{
  "title": "string",
  "description": "string",
  "category": "string",
  "generatedCode": "string",
  "detectedSections": ["string section names, e.g. Hero, Features, CTA"]
}
3. generatedCode must be a valid React component body as JSX with Tailwind classes.
4. Use clean section structure (hero, features, CTA, footer where relevant).
5. Ensure responsive and accessible semantics.
6. Keep code reusable and readable.
7. Do not include external dependencies beyond React and Tailwind.
8. Prefer modern SaaS visual quality and spacing.
`;
}

module.exports = { buildWebsiteGenerationPrompt };

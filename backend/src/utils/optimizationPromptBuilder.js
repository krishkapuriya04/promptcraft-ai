function buildOptimizationPrompt({ code, categories = [] }) {
  return `
You are a senior frontend design engineer optimizing a React + Tailwind component.

Task:
- Improve the UI quality and UX polish while preserving core intent.
- Apply selected optimization categories: ${categories.join(", ") || "General UI improvements"}

Input React/Tailwind code:
${code}

Return STRICT JSON only:
{
  "optimizedCode": "string",
  "summary": "string",
  "suggestions": ["string"]
}

Rules:
1. Keep valid React JSX + Tailwind classes only.
2. Improve spacing, hierarchy, typography, color usage, responsiveness, and accessibility.
3. Do not include markdown/backticks/explanations outside JSON.
4. Keep output concise and production-ready.
`;
}

module.exports = { buildOptimizationPrompt };

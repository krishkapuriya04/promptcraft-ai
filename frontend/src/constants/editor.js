export const EDITOR_STORAGE_PREFIX = "promptcraft_editor_draft_";

export const DEFAULT_EDITOR_FILES = [
  { id: "app", name: "App.jsx", language: "javascript", content: "" },
  {
    id: "styles",
    name: "styles.css",
    language: "css",
    content:
      "/* Optional project styles */\nbody { margin: 0; font-family: Inter, system-ui, sans-serif; }",
  },
  {
    id: "readme",
    name: "README.md",
    language: "markdown",
    content: "# PromptCraft AI Project\n\nEditable workspace draft.",
  },
];

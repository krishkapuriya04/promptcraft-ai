function safeProjectName(name) {
  return (name || "promptcraft-project").toLowerCase().replace(/[^a-z0-9-_]+/g, "-");
}

function toComponentSource(project) {
  return project.generatedCode || `export default function App() {\n  return <div className="p-8">Generated project</div>;\n}`;
}

function toStaticHtml(project) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title>${project.name}</title>
  </head>
  <body class="bg-slate-950 text-slate-100">
    <div id="app"></div>
    <script type="module">
      const root = document.getElementById("app");
      root.innerHTML = ${JSON.stringify(project.generatedHtml || "<section class='p-6'>No generated HTML available.</section>")};
    </script>
  </body>
</html>`;
}

function buildReactProjectFiles(project) {
  const appSource = toComponentSource(project);
  return {
    "src/components/GeneratedPage.jsx": appSource,
    "src/pages/Home.jsx": `import GeneratedPage from "../components/GeneratedPage";\n\nexport default function Home() {\n  return <GeneratedPage />;\n}\n`,
    "src/assets/.gitkeep": "",
    "src/main.jsx":
      'import React from "react";\nimport ReactDOM from "react-dom/client";\nimport "./styles.css";\nimport Home from "./pages/Home";\n\nReactDOM.createRoot(document.getElementById("root")).render(<Home />);\n',
    "src/styles.css":
      "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\nbody { margin: 0; min-height: 100vh; background: #020617; color: #e2e8f0; }\n",
    "index.html":
      '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>PromptCraft Export</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>\n',
    "package.json": JSON.stringify(
      {
        name: safeProjectName(project.name),
        private: true,
        version: "1.0.0",
        type: "module",
        scripts: { dev: "vite", build: "vite build", preview: "vite preview" },
        dependencies: { react: "^19.0.0", "react-dom": "^19.0.0" },
        devDependencies: { autoprefixer: "^10.4.20", postcss: "^8.4.47", tailwindcss: "^3.4.17", vite: "^8.0.0" },
      },
      null,
      2
    ),
    "tailwind.config.js":
      '/** @type {import("tailwindcss").Config} */\nexport default {\n  content: ["./index.html", "./src/**/*.{js,jsx}"],\n  theme: { extend: {} },\n  plugins: [],\n};\n',
    "vite.config.js": 'import { defineConfig } from "vite";\nexport default defineConfig({});\n',
    "README.md": `# ${project.name}\n\nExported from PromptCraft AI.\n\n## Run\n\nnpm install\nnpm run dev\n`,
  };
}

function buildHtmlFiles(project) {
  return {
    "index.html": toStaticHtml(project),
    "README.md": `# ${project.name} Static Export\n\nGenerated static HTML export from PromptCraft AI.\n`,
  };
}

function buildComponentFiles(project) {
  return {
    "GeneratedPage.jsx": toComponentSource(project),
  };
}

function buildJsonBackup(project) {
  return {
    "project-backup.json": JSON.stringify(
      {
        id: project._id,
        name: project.name,
        description: project.description,
        category: project.category,
        theme: project.theme,
        prompt: project.prompt,
        generatedCode: project.generatedCode,
        generatedHtml: project.generatedHtml,
        tags: project.tags,
        version: project.version,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    ),
  };
}

module.exports = {
  buildReactProjectFiles,
  buildHtmlFiles,
  buildComponentFiles,
  buildJsonBackup,
  safeProjectName,
};

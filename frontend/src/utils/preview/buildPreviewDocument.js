function sanitizeForTemplateLiteral(input) {
  return input.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

export function buildPreviewDocument({ code, title = "PromptCraft Preview", renderId }) {
  const safeCode = sanitizeForTemplateLiteral(code || "");
  const safeTitle = sanitizeForTemplateLiteral(title);
  const safeRenderId = sanitizeForTemplateLiteral(String(renderId || "default"));

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body { margin: 0; background: #0f172a; color: #e2e8f0; font-family: Inter, system-ui, sans-serif; }
      #root { min-height: 100vh; }
      .preview-error {
        min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px;
      }
      .preview-error-card {
        width: min(620px, 100%); border: 1px solid rgba(248,113,113,0.45); border-radius: 14px; background: rgba(127,29,29,0.18); padding: 16px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      (function () {
        const { React, ReactDOM, Babel } = window;
        const renderId = "${safeRenderId}";
        const source = \`${safeCode}\`;

        function notify(type, payload) {
          window.parent.postMessage(
            { source: "promptcraft-preview", type, renderId, ...payload },
            "*"
          );
        }

        function showError(message) {
          document.getElementById("root").innerHTML = \`
            <div class="preview-error">
              <div class="preview-error-card">
                <h2 style="margin:0 0 8px;font-size:18px;">Preview rendering failed</h2>
                <p style="margin:0;font-size:13px;line-height:1.6;">\${message}</p>
              </div>
            </div>
          \`;
          notify("render-error", { message });
        }

        function buildExecutableCode(raw) {
          const cleaned = raw.replace(/export\\s+default\\s+/g, "").trim();
          const looksLikeComponent = /function\\s+[A-Za-z0-9_]+\\s*\\(|const\\s+[A-Za-z0-9_]+\\s*=\\s*\\(/.test(cleaned);

          if (looksLikeComponent) {
            return \`
              \${cleaned}
              const __PromptCraftResolved =
                typeof GeneratedComponent !== "undefined" ? GeneratedComponent :
                typeof App !== "undefined" ? App :
                typeof PreviewComponent !== "undefined" ? PreviewComponent :
                null;
            \`;
          }

          return \`
            const __PromptCraftResolved = () => (
              <div className="min-h-screen bg-slate-950 text-slate-100">
                \${cleaned}
              </div>
            );
          \`;
        }

        try {
          const executable = buildExecutableCode(source);
          const transpiled = Babel.transform(executable, { presets: ["react"] }).code;
          const resolver = new Function("React", \`\${transpiled}; return __PromptCraftResolved;\`);
          const ResolvedComponent = resolver(React);

          if (!ResolvedComponent) {
            throw new Error("Could not resolve component. Ensure generated code is valid JSX or a component declaration.");
          }

          ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(ResolvedComponent));
          notify("render-ready", {});
        } catch (error) {
          showError(error && error.message ? error.message : "Unknown preview error");
        }
      })();
    </script>
  </body>
</html>`;
}

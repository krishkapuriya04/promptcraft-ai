import Button from "../common/Button";

export default function AIGenerationPanel({
  form,
  options,
  onChange,
  onGenerate,
  isGenerating,
}) {
  const isDemo = Boolean(options?.demoMode);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">AI Website Generator</h2>
          <p className="mt-1 text-sm text-slate-300">
            Describe what you want and generate production-style React + Tailwind code.
          </p>
        </div>
        {isDemo ? (
          <span
            className="shrink-0 rounded-full border border-amber-400/40 bg-amber-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-200"
            title="OpenAI API key is not configured. Outputs use curated demo templates."
          >
            Demo Mode
          </span>
        ) : null}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-200">
          Website Category
          <select
            value={form.category}
            onChange={(event) => onChange("category", event.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-white/15 bg-slate-950/60 px-3 text-sm text-white outline-none focus:border-brand-300"
          >
            {options.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-slate-200">
          Theme
          <select
            value={form.theme}
            onChange={(event) => onChange("theme", event.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-white/15 bg-slate-950/60 px-3 text-sm text-white outline-none focus:border-brand-300"
          >
            {options.themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block text-sm text-slate-200">
        Prompt
        <textarea
          value={form.prompt}
          onChange={(event) => onChange("prompt", event.target.value)}
          rows={6}
          placeholder="Build a modern SaaS website for a productivity startup with pricing, testimonials, and CTA sections."
          className="mt-1.5 w-full rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-brand-300"
        />
      </label>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-400">Tip: Include audience, layout style, and conversion goals for better output.</p>
        <Button onClick={onGenerate} isLoading={isGenerating} disabled={isGenerating} size="lg">
          {isGenerating ? "Generating..." : "Generate Website"}
        </Button>
      </div>
    </section>
  );
}

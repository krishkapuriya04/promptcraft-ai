export default function DesignAnalysisPanel({ summary, colors, sections }) {
  if (!summary) return null;

  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <h4 className="text-sm font-semibold text-white">AI Analysis Summary</h4>
      <p className="mt-2 text-xs leading-6 text-slate-300">{summary}</p>
      <div className="mt-3">
        <p className="mb-1 text-xs uppercase tracking-[0.1em] text-slate-400">Detected Colors</p>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <span key={color} className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2 py-1 text-[11px] text-slate-200">
              <span className="h-3 w-3 rounded-full border border-white/30" style={{ background: color }} />
              {color}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <p className="mb-1 text-xs uppercase tracking-[0.1em] text-slate-400">Detected Sections</p>
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <span key={section} className="rounded-full border border-white/15 px-2 py-1 text-[11px] text-slate-200">
              {section}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

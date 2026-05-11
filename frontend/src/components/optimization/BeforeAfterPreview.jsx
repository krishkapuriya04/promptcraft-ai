export default function BeforeAfterPreview({ beforeCode, afterCode }) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Before</p>
        <pre className="max-h-64 overflow-auto text-xs text-slate-300">{beforeCode}</pre>
      </div>
      <div className="rounded-xl border border-emerald-300/25 bg-emerald-500/5 p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-200">After</p>
        <pre className="max-h-64 overflow-auto text-xs text-emerald-100">{afterCode || "Run optimization to preview results."}</pre>
      </div>
    </div>
  );
}

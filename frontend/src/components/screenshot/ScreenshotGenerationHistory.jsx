export default function ScreenshotGenerationHistory({ history, onSelect }) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Recent Screenshot Generations</p>
      <div className="space-y-2">
        {history.length === 0 ? (
          <p className="text-xs text-slate-500">No screenshot generations yet.</p>
        ) : (
          history.map((item) => (
            <button
              key={item._id}
              type="button"
              onClick={() => onSelect(item)}
              className="w-full rounded-lg border border-white/10 bg-slate-950/50 p-2 text-left text-xs text-slate-200"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-white">{item.title}</p>
                {item.demoMode ? (
                  <span className="shrink-0 rounded border border-cyan-400/30 bg-cyan-500/10 px-1 py-0.5 text-[9px] font-semibold uppercase text-cyan-100">
                    Demo
                  </span>
                ) : null}
              </div>
              <p className="mt-1 line-clamp-2 text-slate-400">{item.description}</p>
            </button>
          ))
        )}
      </div>
    </section>
  );
}

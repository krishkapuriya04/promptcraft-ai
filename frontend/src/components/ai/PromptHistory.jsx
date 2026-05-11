export default function PromptHistory({ history, selectedId, onSelect }) {
  return (
    <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-300">Prompt History</h3>
      <div className="mt-4 space-y-2">
        {history.length === 0 ? (
          <p className="text-sm text-slate-400">No generations yet. Start with a prompt.</p>
        ) : (
          history.map((item) => (
            <button
              key={item._id}
              type="button"
              onClick={() => onSelect(item._id)}
              className={`w-full rounded-xl border p-3 text-left transition ${
                selectedId === item._id
                  ? "border-brand-300/60 bg-brand-500/10"
                  : "border-white/10 bg-slate-950/40 hover:border-white/20"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-white">{item.title}</p>
                {item.demoMode ? (
                  <span className="shrink-0 rounded border border-amber-400/35 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-amber-200">
                    Demo
                  </span>
                ) : null}
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-slate-400">{item.prompt}</p>
              {item.detectedSections?.length ? (
                <p className="mt-2 text-[10px] text-slate-500">Sections: {item.detectedSections.join(" · ")}</p>
              ) : null}
            </button>
          ))
        )}
      </div>
    </aside>
  );
}

export default function ImprovementHistoryPanel({ history, selectedIndex, onSelect }) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Applied Changes History</p>
      <div className="space-y-2">
        {history.length === 0 ? (
          <p className="text-xs text-slate-500">No optimization history.</p>
        ) : (
          history.map((entry, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(idx)}
              className={`w-full rounded-lg border px-3 py-2 text-left text-xs ${
                selectedIndex === idx ? "border-brand-300/50 bg-brand-500/10 text-brand-100" : "border-white/10 text-slate-300"
              }`}
            >
              {entry.categories?.join(", ") || "General optimization"} • {new Date(entry.createdAt).toLocaleString()}
            </button>
          ))
        )}
      </div>
    </section>
  );
}

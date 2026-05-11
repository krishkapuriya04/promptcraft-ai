export default function OptimizationSuggestions({ suggestions }) {
  return (
    <aside className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">AI Suggestions</p>
      {suggestions.length === 0 ? (
        <p className="text-xs text-slate-500">No suggestions yet.</p>
      ) : (
        <ul className="space-y-2">
          {suggestions.map((item, idx) => (
            <li key={idx} className="rounded-lg bg-slate-900/60 px-2 py-1.5 text-xs text-slate-200">
              {item}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

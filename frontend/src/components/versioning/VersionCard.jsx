export default function VersionCard({
  version,
  onCompare,
  onRestore,
  onDelete,
  onToggleFavorite,
}) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-white">{version.label || "Unnamed Version"}</p>
          <p className="text-xs text-slate-400">{new Date(version.createdAt).toLocaleString()}</p>
        </div>
        <button type="button" onClick={onToggleFavorite} className={version.isFavorite ? "text-amber-300" : "text-slate-500"}>
          ★
        </button>
      </div>
      <p className="mt-2 text-xs text-slate-300">{version.summary}</p>
      {version.note ? <p className="mt-1 text-xs text-slate-400">{version.note}</p> : null}
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={onCompare} className="rounded-md border border-white/15 px-2 py-1 text-xs text-slate-200">
          Compare
        </button>
        <button type="button" onClick={onRestore} className="rounded-md border border-emerald-300/30 px-2 py-1 text-xs text-emerald-200">
          Restore
        </button>
        <button type="button" onClick={onDelete} className="rounded-md border border-rose-300/30 px-2 py-1 text-xs text-rose-200">
          Delete
        </button>
      </div>
    </article>
  );
}

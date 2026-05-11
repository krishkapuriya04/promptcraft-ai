import VersionCard from "./VersionCard";

export default function VersionTimeline({
  versions,
  isLoading,
  onCompare,
  onRestore,
  onDelete,
  onToggleFavorite,
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Timeline</p>
      {isLoading ? (
        <p className="text-xs text-slate-500">Loading versions...</p>
      ) : versions.length === 0 ? (
        <p className="text-xs text-slate-500">No versions available yet.</p>
      ) : (
        <div className="space-y-3">
          {versions.map((version) => (
            <VersionCard
              key={version._id}
              version={version}
              onCompare={() => onCompare(version._id)}
              onRestore={() => onRestore(version)}
              onDelete={() => onDelete(version._id)}
              onToggleFavorite={() => onToggleFavorite(version._id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * Empty state when offline or when a network-dependent view has no data.
 */
export default function EmptyOfflineState({
  title = "You appear to be offline",
  description = "Check your connection and try again. Cached pages may still be available.",
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-lg" aria-hidden="true">
        📡
      </div>
      <h2 className="mt-4 text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-slate-400">{description}</p>
    </div>
  );
}

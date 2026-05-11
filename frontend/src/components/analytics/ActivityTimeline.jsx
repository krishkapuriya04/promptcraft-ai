export default function ActivityTimeline({ items }) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <h3 className="mb-3 text-sm font-semibold text-white">Recent Activity Timeline</h3>
      <div className="max-h-80 space-y-2 overflow-auto">
        {items.length === 0 ? (
          <p className="text-xs text-slate-500">No activity recorded yet.</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className="rounded-lg border border-white/10 bg-slate-950/50 p-2 text-xs text-slate-200">
              <p className="font-medium">{item.type}</p>
              <p className="text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

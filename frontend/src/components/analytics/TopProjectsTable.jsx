export default function TopProjectsTable({ projects }) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <h3 className="mb-3 text-sm font-semibold text-white">Top Projects</h3>
      <div className="space-y-2">
        {projects.length === 0 ? (
          <p className="text-xs text-slate-500">No project activity yet.</p>
        ) : (
          projects.map((item) => (
            <div key={item._id} className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-200">
              <span>{item.name}</span>
              <span>{item.count} activities</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default function EmptyProjectsState({ hasFilters }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
      <h3 className="text-lg font-semibold text-white">{hasFilters ? "No projects match your filters." : "No projects yet."}</h3>
      <p className="mt-2 text-sm text-slate-400">
        {hasFilters
          ? "Try changing search or filter settings."
          : "Generate your first AI website to start building your workspace."}
      </p>
    </div>
  );
}

export default function AnalyticsFilters({ filters, onChange }) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="grid gap-3 md:grid-cols-2">
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(event) => onChange("dateFrom", event.target.value)}
          className="h-10 rounded-lg border border-white/15 bg-slate-950/50 px-3 text-sm text-slate-100"
        />
        <input
          type="date"
          value={filters.dateTo}
          onChange={(event) => onChange("dateTo", event.target.value)}
          className="h-10 rounded-lg border border-white/15 bg-slate-950/50 px-3 text-sm text-slate-100"
        />
      </div>
    </section>
  );
}

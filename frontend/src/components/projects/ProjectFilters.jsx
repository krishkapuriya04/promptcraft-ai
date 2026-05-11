import { PROJECT_SORT_OPTIONS, PROJECT_VIEW_MODES } from "../../constants/projectFilters";

export default function ProjectFilters({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  categories,
  themes,
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="grid gap-3 md:grid-cols-5">
        <input
          value={filters.search}
          onChange={(event) => onFilterChange("search", event.target.value)}
          placeholder="Search projects..."
          className="h-10 rounded-xl border border-white/15 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none focus:border-brand-300 md:col-span-2"
        />
        <select
          value={filters.category}
          onChange={(event) => onFilterChange("category", event.target.value)}
          className="h-10 rounded-xl border border-white/15 bg-slate-950/60 px-3 text-sm text-slate-200"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={filters.theme}
          onChange={(event) => onFilterChange("theme", event.target.value)}
          className="h-10 rounded-xl border border-white/15 bg-slate-950/60 px-3 text-sm text-slate-200"
        >
          <option value="">All themes</option>
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
        <select
          value={filters.sort}
          onChange={(event) => onFilterChange("sort", event.target.value)}
          className="h-10 rounded-xl border border-white/15 bg-slate-950/60 px-3 text-sm text-slate-200"
        >
          {PROJECT_SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(event) => onFilterChange("dateFrom", event.target.value)}
          className="h-10 rounded-xl border border-white/15 bg-slate-950/60 px-3 text-sm text-slate-200"
        />
        <input
          type="date"
          value={filters.dateTo}
          onChange={(event) => onFilterChange("dateTo", event.target.value)}
          className="h-10 rounded-xl border border-white/15 bg-slate-950/60 px-3 text-sm text-slate-200"
        />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <select
          value={filters.favorite}
          onChange={(event) => onFilterChange("favorite", event.target.value)}
          className="h-9 rounded-lg border border-white/15 bg-slate-950/60 px-3 text-xs text-slate-200"
        >
          <option value="">All projects</option>
          <option value="true">Favorites only</option>
        </select>
        <div className="inline-flex rounded-lg border border-white/15 bg-white/[0.03] p-1">
          <button
            type="button"
            onClick={() => onViewModeChange(PROJECT_VIEW_MODES.GRID)}
            className={`rounded-md px-3 py-1 text-xs ${viewMode === PROJECT_VIEW_MODES.GRID ? "bg-brand-500/20 text-brand-100" : "text-slate-300"}`}
          >
            Grid
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange(PROJECT_VIEW_MODES.LIST)}
            className={`rounded-md px-3 py-1 text-xs ${viewMode === PROJECT_VIEW_MODES.LIST ? "bg-brand-500/20 text-brand-100" : "text-slate-300"}`}
          >
            List
          </button>
        </div>
      </div>
    </section>
  );
}

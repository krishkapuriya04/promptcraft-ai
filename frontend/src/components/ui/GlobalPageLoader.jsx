export default function GlobalPageLoader({ label = "Loading workspace..." }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-slate-200 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-brand-300" />
          {label}
        </div>
      </div>
    </div>
  );
}

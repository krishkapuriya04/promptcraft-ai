export default function ProjectsSkeletonLoader() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="animate-pulse rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="h-24 rounded-xl bg-white/10" />
          <div className="mt-4 h-4 w-2/3 rounded bg-white/10" />
          <div className="mt-2 h-3 w-1/3 rounded bg-white/10" />
          <div className="mt-4 h-3 w-full rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}

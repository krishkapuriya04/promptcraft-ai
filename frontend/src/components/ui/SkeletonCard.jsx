export default function SkeletonCard({ className = "" }) {
  return (
    <div className={`animate-pulse rounded-xl border border-white/10 bg-white/[0.03] p-4 ${className}`}>
      <div className="h-4 w-1/2 rounded bg-white/10" />
      <div className="mt-3 h-3 w-3/4 rounded bg-white/10" />
      <div className="mt-2 h-3 w-2/3 rounded bg-white/10" />
    </div>
  );
}

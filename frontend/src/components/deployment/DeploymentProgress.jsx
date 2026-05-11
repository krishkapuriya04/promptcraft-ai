export default function DeploymentProgress({ progress }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="mb-1 flex justify-between text-xs text-slate-300">
        <span>Deployment progress</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-brand-400 transition-all duration-200" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

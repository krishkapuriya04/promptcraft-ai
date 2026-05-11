import DeploymentStatusBadge from "./DeploymentStatusBadge";

export default function LiveProjectCard({ deployment }) {
  if (!deployment) return null;
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-white">Live Deployment</p>
        <DeploymentStatusBadge status={deployment.status} />
      </div>
      <p className="mt-1 text-xs text-slate-400">{deployment.provider}</p>
      {deployment.url ? (
        <div className="mt-3 flex gap-2">
          <button type="button" onClick={() => navigator.clipboard.writeText(deployment.url)} className="rounded border border-white/15 px-2 py-1 text-xs text-slate-200">
            Copy Live URL
          </button>
          <a href={deployment.url} target="_blank" rel="noreferrer" className="rounded border border-white/15 px-2 py-1 text-xs text-cyan-200">
            Open Site
          </a>
        </div>
      ) : null}
    </section>
  );
}

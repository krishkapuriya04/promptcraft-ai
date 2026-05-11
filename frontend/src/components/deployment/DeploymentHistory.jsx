import DeploymentStatusBadge from "./DeploymentStatusBadge";

export default function DeploymentHistory({ history, onRedeploy, onSelect }) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Deployment History</p>
      <div className="space-y-2">
        {history.length === 0 ? (
          <p className="text-xs text-slate-500">No deployments yet.</p>
        ) : (
          history.map((item) => (
            <div key={item.deploymentId} className="rounded-lg border border-white/10 bg-slate-950/50 p-2">
              <div className="flex items-center justify-between gap-2">
                <button type="button" onClick={() => onSelect(item)} className="text-left text-xs text-slate-200">
                  {item.provider} • v{item.sourceVersion}
                </button>
                <DeploymentStatusBadge status={item.status} />
              </div>
              <div className="mt-2 flex items-center gap-2">
                {item.url ? (
                  <>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(item.url)}
                      className="rounded border border-white/15 px-2 py-0.5 text-[11px] text-slate-200"
                    >
                      Copy URL
                    </button>
                    <a href={item.url} target="_blank" rel="noreferrer" className="rounded border border-white/15 px-2 py-0.5 text-[11px] text-cyan-200">
                      Open
                    </a>
                  </>
                ) : null}
                <button
                  type="button"
                  onClick={() => onRedeploy(item)}
                  className="rounded border border-white/15 px-2 py-0.5 text-[11px] text-slate-200"
                >
                  Redeploy
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

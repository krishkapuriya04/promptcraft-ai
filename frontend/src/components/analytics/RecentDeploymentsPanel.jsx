import { DeploymentStatusBadge } from "../deployment";

export default function RecentDeploymentsPanel({ deployments }) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <h3 className="mb-3 text-sm font-semibold text-white">Recent Deployments</h3>
      <div className="space-y-2">
        {deployments.length === 0 ? (
          <p className="text-xs text-slate-500">No deployments yet.</p>
        ) : (
          deployments.map((item) => (
            <div key={item.deploymentId} className="rounded-lg border border-white/10 bg-slate-950/50 p-2 text-xs text-slate-200">
              <div className="flex items-center justify-between">
                <p>{item.projectName}</p>
                <DeploymentStatusBadge status={item.status} />
              </div>
              {item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer" className="mt-1 inline-block text-cyan-200">
                  Open Deployment
                </a>
              ) : null}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

import { useRef } from "react";
import { useModalFocusTrap } from "../../hooks/useModalFocusTrap";
import Button from "../common/Button";
import DeploymentHistory from "./DeploymentHistory";
import DeploymentLogsPanel from "./DeploymentLogsPanel";
import DeploymentProgress from "./DeploymentProgress";
import LiveProjectCard from "./LiveProjectCard";

export default function DeployProjectModal({
  isOpen,
  onClose,
  provider,
  providers,
  onProviderChange,
  onDeploy,
  isDeploying,
  progress,
  activeDeployment,
  history,
  onRedeploy,
  onSelectHistory,
}) {
  const panelRef = useRef(null);
  useModalFocusTrap({ isActive: isOpen, onEscape: onClose, containerRef: panelRef });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[94] overflow-auto bg-slate-950/85 px-4 py-6"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="deploy-modal-title"
        className="mx-auto w-full max-w-4xl rounded-2xl border border-white/10 bg-slate-900 p-5 outline-none"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 id="deploy-modal-title" className="text-lg font-semibold text-white">
            Deploy Project
          </h3>
          <button type="button" onClick={onClose} className="rounded-lg border border-white/15 px-3 py-1 text-xs text-slate-300">
            Close
          </button>
        </div>
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="mb-2 text-xs uppercase tracking-[0.12em] text-slate-400">Provider</p>
              <select
                value={provider}
                onChange={(event) => onProviderChange(event.target.value)}
                className="h-10 w-full rounded-lg border border-white/15 bg-slate-950/50 px-3 text-sm text-slate-100"
              >
                {providers.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <div className="mt-3">
                <Button onClick={onDeploy} isLoading={isDeploying} disabled={isDeploying}>
                  {isDeploying ? "Deploying..." : "One-Click Deploy"}
                </Button>
              </div>
            </div>
            <DeploymentProgress progress={progress} />
            <DeploymentLogsPanel logs={activeDeployment?.logs || []} />
          </div>
          <div className="space-y-4 lg:col-span-4">
            <LiveProjectCard deployment={activeDeployment} />
            <DeploymentHistory
              history={history}
              onRedeploy={(item) => onRedeploy(item.deploymentId)}
              onSelect={onSelectHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

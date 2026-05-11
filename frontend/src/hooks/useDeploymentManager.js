import { useState } from "react";
import { deploymentService } from "../services/deploymentService";
import { getApiErrorMessage } from "../utils/apiError";
import { useToast } from "./useToast";

export function useDeploymentManager({ projectId, sourceVersion }) {
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [providers, setProviders] = useState([]);
  const [provider, setProvider] = useState("mock");
  const [history, setHistory] = useState([]);
  const [activeDeployment, setActiveDeployment] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [progress, setProgress] = useState(0);

  const openModal = async () => {
    if (!projectId) return;
    setIsOpen(true);
    try {
      const [providerRes, historyRes] = await Promise.all([
        deploymentService.providers(),
        deploymentService.list(projectId),
      ]);
      setProviders(providerRes.data.providers);
      setHistory(historyRes.data.deployments);
      if (historyRes.data.deployments?.[0]) {
        setActiveDeployment(historyRes.data.deployments[0]);
      }
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Failed to load deployment workspace.") });
    }
  };

  const startPolling = (deploymentId) => {
    const timer = window.setInterval(async () => {
      try {
        const response = await deploymentService.status(projectId, deploymentId);
        const deployment = response.data.deployment;
        setActiveDeployment(deployment);
        if (deployment.status === "ready") {
          setProgress(100);
          window.clearInterval(timer);
          showToast({ type: "success", message: "Deployment is live." });
          const list = await deploymentService.list(projectId);
          setHistory(list.data.deployments);
          setIsDeploying(false);
        } else if (deployment.status === "failed") {
          window.clearInterval(timer);
          setIsDeploying(false);
          showToast({ type: "error", message: "Deployment failed. Check logs." });
        } else {
          setProgress((prev) => Math.min(prev + 10, 90));
        }
      } catch {
        window.clearInterval(timer);
        setIsDeploying(false);
      }
    }, 900);
  };

  const deploy = async () => {
    if (!projectId) return;
    setIsDeploying(true);
    setProgress(8);
    try {
      const response = await deploymentService.deploy(projectId, { provider, sourceVersion });
      startPolling(response.data.deploymentId);
    } catch (error) {
      setIsDeploying(false);
      showToast({ type: "error", message: getApiErrorMessage(error, "Failed to start deployment.") });
    }
  };

  const redeploy = async (deploymentId) => {
    if (!projectId || !deploymentId) return;
    setIsDeploying(true);
    setProgress(8);
    try {
      const response = await deploymentService.redeploy(projectId, deploymentId);
      startPolling(response.data.deploymentId);
    } catch (error) {
      setIsDeploying(false);
      showToast({ type: "error", message: getApiErrorMessage(error, "Failed to start redeployment.") });
    }
  };

  return {
    isOpen,
    setIsOpen,
    openModal,
    providers,
    provider,
    setProvider,
    history,
    activeDeployment,
    setActiveDeployment,
    isDeploying,
    progress,
    deploy,
    redeploy,
  };
}

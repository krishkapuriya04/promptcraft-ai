import apiClient from "./api/client";

export const deploymentService = {
  providers: async () => {
    const { data } = await apiClient.get("/deployments/providers");
    return data;
  },
  list: async (projectId) => {
    const { data } = await apiClient.get(`/deployments/${projectId}`);
    return data;
  },
  deploy: async (projectId, payload) => {
    const { data } = await apiClient.post(`/deployments/${projectId}`, payload);
    return data;
  },
  status: async (projectId, deploymentId) => {
    const { data } = await apiClient.get(`/deployments/${projectId}/${deploymentId}`);
    return data;
  },
  redeploy: async (projectId, deploymentId) => {
    const { data } = await apiClient.post(`/deployments/${projectId}/${deploymentId}/redeploy`);
    return data;
  },
};

import apiClient from "./api/client";

export const optimizationService = {
  options: async () => {
    const { data } = await apiClient.get("/optimizations/options");
    return data;
  },
  improve: async ({ projectId, code, categories }) => {
    const { data } = await apiClient.post(`/optimizations/${projectId}/improve`, { code, categories });
    return data;
  },
  revert: async ({ projectId, historyIndex }) => {
    const { data } = await apiClient.post(`/optimizations/${projectId}/revert`, { historyIndex });
    return data;
  },
};

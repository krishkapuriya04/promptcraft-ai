import apiClient from "./api/client";

export const projectService = {
  create: async (payload) => {
    const { data } = await apiClient.post("/projects", payload);
    return data;
  },
  list: async (params = {}) => {
    const { data } = await apiClient.get("/projects", { params });
    return data;
  },
  byId: async (projectId) => {
    const { data } = await apiClient.get(`/projects/${projectId}`);
    return data;
  },
  update: async (projectId, payload) => {
    const { data } = await apiClient.patch(`/projects/${projectId}`, payload);
    return data;
  },
  remove: async (projectId) => {
    const { data } = await apiClient.delete(`/projects/${projectId}`);
    return data;
  },
  toggleFavorite: async (projectId) => {
    const { data } = await apiClient.patch(`/projects/${projectId}/favorite`);
    return data;
  },
  duplicate: async (projectId) => {
    const { data } = await apiClient.post(`/projects/${projectId}/duplicate`);
    return data;
  },
};

import apiClient from "./api/client";

export const versionService = {
  list: async (projectId, params = {}) => {
    const { data } = await apiClient.get(`/versions/${projectId}`, { params });
    return data;
  },
  saveCheckpoint: async (projectId, payload) => {
    const { data } = await apiClient.post(`/versions/${projectId}/checkpoints`, payload);
    return data;
  },
  compare: async (projectId, params) => {
    const { data } = await apiClient.get(`/versions/${projectId}/compare`, { params });
    return data;
  },
  restore: async (projectId, versionId) => {
    const { data } = await apiClient.post(`/versions/${projectId}/${versionId}/restore`);
    return data;
  },
  remove: async (projectId, versionId) => {
    const { data } = await apiClient.delete(`/versions/${projectId}/${versionId}`);
    return data;
  },
  toggleFavorite: async (projectId, versionId) => {
    const { data } = await apiClient.patch(`/versions/${projectId}/${versionId}/favorite`);
    return data;
  },
};

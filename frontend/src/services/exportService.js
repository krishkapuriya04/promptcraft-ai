import apiClient from "./api/client";

export const exportService = {
  options: async (projectId) => {
    const { data } = await apiClient.get(`/exports/${projectId}/options`);
    return data;
  },
  archive: async ({ projectId, format, selectedFiles }) => {
    const response = await apiClient.post(
      `/exports/${projectId}/archive`,
      { format, selectedFiles },
      { responseType: "blob" }
    );
    return response;
  },
};

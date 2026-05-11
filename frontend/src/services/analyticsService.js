import apiClient from "./api/client";

export const analyticsService = {
  summary: async (params = {}) => {
    const { data } = await apiClient.get("/analytics/summary", { params });
    return data;
  },
};

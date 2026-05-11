import apiClient from "./api/client";

export const aiService = {
  getOptions: async () => {
    const { data } = await apiClient.get("/ai/options");
    return data;
  },
  generate: async (payload) => {
    const { data } = await apiClient.post("/ai/generate", payload);
    return data;
  },
  history: async () => {
    const { data } = await apiClient.get("/ai/history");
    return data;
  },
};

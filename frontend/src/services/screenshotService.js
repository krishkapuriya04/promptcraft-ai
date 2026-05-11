import apiClient from "./api/client";

export const screenshotService = {
  generate: async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append("screenshot", file);
    const { data } = await apiClient.post("/screenshots/generate", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress,
    });
    return data;
  },
  history: async () => {
    const { data } = await apiClient.get("/screenshots/history");
    return data;
  },
};

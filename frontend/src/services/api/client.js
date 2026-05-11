import axios from "axios";
import { storage } from "../../utils/storage";

function normalizeApiBaseUrl(raw) {
  const trimmed = String(raw ?? "")
    .trim()
    .replace(/\/+$/, "");
  return trimmed || "http://localhost:5000/api";
}

const apiClient = axios.create({
  baseURL: normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL),
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    const isNetworkError = !error.response && Boolean(config);
    if (isNetworkError && config && !config.__retryCount) {
      config.__retryCount = 1;
      await new Promise((resolve) => {
        setTimeout(resolve, 650);
      });
      return apiClient(config);
    }

    if (error.response?.status === 401) {
      if (storage.getToken()) {
        storage.clearAuth();
        window.dispatchEvent(new Event("auth:session-expired"));
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

import apiClient from "./api/client";
import { extractAuthSession } from "../utils/extractAuthSession";

export const authService = {
  signup: async (payload) => {
    const { data } = await apiClient.post("/auth/signup", payload);
    return extractAuthSession(data);
  },
  login: async (payload) => {
    const { data } = await apiClient.post("/auth/login", payload);
    return extractAuthSession(data);
  },
  profile: async () => {
    const { data } = await apiClient.get("/auth/profile");
    return data;
  },
  forgotPassword: async (payload) => {
    const { data } = await apiClient.post("/auth/forgot-password", payload);
    return data;
  },
};

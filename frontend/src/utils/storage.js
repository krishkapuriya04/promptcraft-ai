const AUTH_TOKEN_KEY = "promptcraft_token";
const AUTH_USER_KEY = "promptcraft_user";

export const storage = {
  getToken: () => localStorage.getItem(AUTH_TOKEN_KEY),
  setToken: (token) => localStorage.setItem(AUTH_TOKEN_KEY, token),
  clearToken: () => localStorage.removeItem(AUTH_TOKEN_KEY),
  getUser: () => {
    try {
      const user = localStorage.getItem(AUTH_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },
  setUser: (user) => localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user)),
  clearUser: () => localStorage.removeItem(AUTH_USER_KEY),
  clearAuth: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  },
};

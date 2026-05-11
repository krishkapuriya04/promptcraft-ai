import { useEffect, useMemo, useState } from "react";
import { useToast } from "../hooks/useToast";
import { authService } from "../services/authService";
import { isTokenExpired } from "../utils/authToken";
import { storage } from "../utils/storage";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const { showToast } = useToast();
  const [user, setUser] = useState(storage.getUser());
  const [token, setToken] = useState(storage.getToken());
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    async function bootstrapAuth() {
      if (!token) {
        setIsAuthLoading(false);
        return;
      }
      if (isTokenExpired(token)) {
        storage.clearAuth();
        setUser(null);
        setToken(null);
        setIsAuthLoading(false);
        showToast({ type: "info", message: "Your session expired. Please sign in again." });
        return;
      }
      try {
        const response = await authService.profile();
        setUser(response.data.user);
        storage.setUser(response.data.user);
      } catch {
        storage.clearAuth();
        setUser(null);
        setToken(null);
      } finally {
        setIsAuthLoading(false);
      }
    }

    bootstrapAuth();
  }, [token, showToast]);

  useEffect(() => {
    function handleSessionExpired() {
      setUser(null);
      setToken(null);
      storage.clearAuth();
      showToast({ type: "info", message: "Your session expired. Please sign in again." });
    }
    window.addEventListener("auth:session-expired", handleSessionExpired);
    return () => window.removeEventListener("auth:session-expired", handleSessionExpired);
  }, [showToast]);

  const login = (authPayload) => {
    const { user: authUser, token: authToken } = authPayload;
    setUser(authUser);
    setToken(authToken);
    storage.setUser(authUser);
    storage.setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    storage.clearAuth();
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isAuthLoading,
      login,
      logout,
    }),
    [user, token, isAuthLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

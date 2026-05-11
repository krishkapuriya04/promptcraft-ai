const isDev = import.meta.env.DEV;

function formatNetworkDetails(error) {
  const bits = [];
  if (error?.code) bits.push(error.code);
  if (isDev && error?.message && error.message !== "Network Error") bits.push(error.message);
  return bits.length ? ` (${bits.join(" · ")})` : "";
}

export function getApiErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  const data = error?.response?.data;
  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  if (!error?.response) {
    if (error?.code === "ECONNABORTED" || error?.message?.toLowerCase().includes("timeout")) {
      return `Request timed out.${formatNetworkDetails(error)} Check your connection and API URL.`;
    }
    if (error?.message === "Network Error" || error?.code === "ERR_NETWORK") {
      const base = import.meta.env.VITE_API_BASE_URL
        ? `Tried: ${String(import.meta.env.VITE_API_BASE_URL).trim()}`
        : "Using default http://localhost:5000/api";
      return `Cannot reach the API.${formatNetworkDetails(error)} ${base}. Ensure the backend is running on port 5000, the URL includes /api, and CORS allows this page's origin (localhost vs 127.0.0.1 must match CLIENT_URL in development, or use the same host the SPA is opened on).`;
    }
    if (isDev && error?.message) {
      return `${error.message}${formatNetworkDetails(error)}`;
    }
  }

  return fallback;
}

export function isUnauthorizedError(error) {
  return error?.response?.status === 401;
}

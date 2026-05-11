import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AppErrorBoundary from "./components/ui/AppErrorBoundary";
import NetworkStatusBanner from "./components/ui/NetworkStatusBanner";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ReducedMotionProvider } from "./context/ReducedMotionProvider.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ReducedMotionProvider>
          <ToastProvider>
            <AuthProvider>
              <AppErrorBoundary>
                <NetworkStatusBanner />
                <App />
              </AppErrorBoundary>
            </AuthProvider>
          </ToastProvider>
        </ReducedMotionProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

import { useEffect, useMemo, useState } from "react";
import { buildPreviewDocument } from "../utils/preview/buildPreviewDocument";

export function usePreviewState({ code, title }) {
  const [device, setDevice] = useState("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [lastReadyRenderId, setLastReadyRenderId] = useState("");
  const [lastError, setLastError] = useState({ renderId: "", message: "" });

  const renderId = useMemo(
    () => `${refreshCounter}-${code.length}-${code.slice(0, 16)}`,
    [refreshCounter, code]
  );

  const renderError = lastError.renderId === renderId ? lastError.message : "";
  const isRendering = Boolean(code) && lastReadyRenderId !== renderId && !renderError;

  useEffect(() => {
    function onPreviewMessage(event) {
      const payload = event.data;
      if (!payload || payload.source !== "promptcraft-preview") return;
      if (payload.renderId !== renderId) return;

      if (payload.type === "render-ready") {
        setLastReadyRenderId(renderId);
        setLastError({ renderId: "", message: "" });
      }
      if (payload.type === "render-error") {
        setLastError({ renderId, message: payload.message || "Preview rendering failed." });
      }
    }

    window.addEventListener("message", onPreviewMessage);
    return () => window.removeEventListener("message", onPreviewMessage);
  }, [renderId]);

  const srcDoc = useMemo(
    () => buildPreviewDocument({ code, title: title || "Generated Website Preview", renderId }),
    [code, title, renderId]
  );

  const refreshPreview = () => {
    setLastError({ renderId: "", message: "" });
    setRefreshCounter((prev) => prev + 1);
  };

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setIsFullscreen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return {
    device,
    setDevice,
    isFullscreen,
    setIsFullscreen,
    isPreviewOpen,
    setIsPreviewOpen,
    isRendering,
    renderError,
    srcDoc,
    refreshPreview,
  };
}

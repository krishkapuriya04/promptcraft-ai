import { useEffect, useState } from "react";

/**
 * Sticky banner when the browser is offline; dismisses automatically when back online.
 */
export default function NetworkStatusBanner() {
  const [online, setOnline] = useState(() => typeof navigator !== "undefined" && navigator.onLine);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  if (online) return null;

  return (
    <div
      role="status"
      aria-live="assertive"
      className="fixed inset-x-0 top-0 z-[200] border-b border-amber-500/40 bg-amber-950/95 px-4 py-2 text-center text-sm text-amber-100"
    >
      You are offline. Changes may not save until your connection returns.
    </div>
  );
}

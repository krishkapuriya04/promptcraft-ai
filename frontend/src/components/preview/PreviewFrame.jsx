import PreviewErrorFallback from "./PreviewErrorFallback";
import PreviewLoadingOverlay from "./PreviewLoadingOverlay";

const DEVICE_WRAPPERS = {
  desktop: "w-full",
  tablet: "mx-auto w-[820px] max-w-full",
  mobile: "mx-auto w-[390px] max-w-full",
};

export default function PreviewFrame({
  srcDoc,
  device,
  isRendering,
  error,
  onRefresh,
  isFullscreen,
}) {
  const containerClass = isFullscreen
    ? "fixed inset-0 z-50 bg-slate-950 p-4 sm:p-6"
    : "rounded-2xl border border-white/10 bg-white/[0.03] p-4";

  return (
    <section className={containerClass}>
      {error ? <PreviewErrorFallback message={error} onRefresh={onRefresh} /> : null}
      <div className={`relative transition-all duration-200 ${DEVICE_WRAPPERS[device]}`}>
        {isRendering ? <PreviewLoadingOverlay /> : null}
        <iframe
          title="Generated website live preview"
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          className="h-[72vh] w-full rounded-xl border border-white/10 bg-slate-900"
        />
      </div>
    </section>
  );
}

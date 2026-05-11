import DeviceSwitcher from "./DeviceSwitcher";

export default function PreviewToolbar({
  device,
  onDeviceChange,
  onRefresh,
  onToggleFullscreen,
  onToggleOpen,
  isFullscreen,
  isOpen,
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <DeviceSwitcher device={device} onChange={onDeviceChange} />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onRefresh}
          className="rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/10"
        >
          Refresh Preview
        </button>
        <button
          type="button"
          onClick={onToggleOpen}
          className="rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/10"
        >
          {isOpen ? "Close Preview" : "Open Preview"}
        </button>
        <button
          type="button"
          onClick={onToggleFullscreen}
          className="rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/10"
        >
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>
    </div>
  );
}

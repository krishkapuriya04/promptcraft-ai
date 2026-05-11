export default function ScreenshotAnalysisLoader() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-sm text-slate-200">Analyzing screenshot and generating code...</p>
      <div className="mt-3 animate-pulse space-y-2">
        <div className="h-3 rounded bg-white/10" />
        <div className="h-3 rounded bg-white/10" />
        <div className="h-3 rounded bg-white/10" />
      </div>
    </div>
  );
}

export default function ExportSuccessState({ onClose, onAnother }) {
  return (
    <div className="rounded-xl border border-emerald-300/30 bg-emerald-500/10 p-4">
      <h4 className="text-sm font-semibold text-emerald-200">Export successful</h4>
      <p className="mt-1 text-xs text-emerald-100/90">Your project package is ready and downloaded.</p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={onAnother} className="rounded-lg border border-emerald-200/40 px-3 py-1 text-xs text-emerald-100">
          Export Another
        </button>
        <button type="button" onClick={onClose} className="rounded-lg border border-emerald-200/40 px-3 py-1 text-xs text-emerald-100">
          Close
        </button>
      </div>
    </div>
  );
}

export default function PreviewErrorFallback({ message, onRefresh }) {
  return (
    <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-5">
      <h4 className="text-sm font-semibold text-rose-200">Preview failed to render</h4>
      <p className="mt-1 text-xs leading-6 text-rose-100/90">{message}</p>
      <button
        type="button"
        onClick={onRefresh}
        className="mt-3 rounded-lg border border-rose-200/40 bg-rose-200/10 px-3 py-1.5 text-xs font-medium text-rose-100 transition hover:bg-rose-200/20"
      >
        Refresh Preview
      </button>
    </div>
  );
}

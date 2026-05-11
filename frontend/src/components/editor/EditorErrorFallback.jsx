export default function EditorErrorFallback({ message, onRetry }) {
  return (
    <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-5">
      <h2 className="text-sm font-semibold text-rose-200">Editor workspace unavailable</h2>
      <p className="mt-2 text-sm text-rose-100">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-lg border border-rose-200/40 bg-rose-200/10 px-3 py-1.5 text-xs font-medium text-rose-100"
      >
        Retry
      </button>
    </div>
  );
}

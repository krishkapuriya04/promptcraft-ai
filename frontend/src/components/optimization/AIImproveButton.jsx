export default function AIImproveButton({ onClick, isLoading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className="rounded-lg border border-fuchsia-300/40 bg-fuchsia-500/20 px-3 py-1.5 text-xs font-medium text-fuchsia-100 transition hover:bg-fuchsia-500/30 disabled:opacity-60"
    >
      {isLoading ? "Improving..." : "Improve UI"}
    </button>
  );
}

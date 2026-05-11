export default function FloatingActionButton({ label, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="fixed bottom-5 right-5 z-40 rounded-full border border-brand-300/40 bg-brand-500/20 px-4 py-2 text-xs font-semibold text-brand-100 shadow-xl backdrop-blur transition hover:bg-brand-500/30"
    >
      {label}
    </button>
  );
}

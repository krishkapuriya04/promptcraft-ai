export default function ExportOptionCard({ option, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      className={`rounded-xl border p-3 text-left transition ${
        isSelected ? "border-brand-300/50 bg-brand-500/15" : "border-white/10 bg-white/[0.03] hover:border-white/20"
      }`}
    >
      <p className="text-sm font-semibold text-white">{option.title}</p>
      <p className="mt-1 text-xs text-slate-300">{option.description}</p>
    </button>
  );
}

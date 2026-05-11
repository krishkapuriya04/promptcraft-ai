const DEVICES = [
  { id: "desktop", label: "Desktop" },
  { id: "tablet", label: "Tablet" },
  { id: "mobile", label: "Mobile" },
];

export default function DeviceSwitcher({ device, onChange }) {
  return (
    <div className="inline-flex rounded-xl border border-white/10 bg-slate-950/60 p-1" role="tablist" aria-label="Preview device mode">
      {DEVICES.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={device === item.id}
          onClick={() => onChange(item.id)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            device === item.id ? "bg-brand-500/20 text-brand-100" : "text-slate-300 hover:bg-white/10"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

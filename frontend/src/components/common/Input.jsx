export default function Input({ label, id, type = "text", ...props }) {
  return (
    <label htmlFor={id} className="flex w-full flex-col gap-1 text-sm">
      <span className="font-medium text-slate-700">{label}</span>
      <input
        id={id}
        type={type}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-brand-500 transition focus:ring-2"
        {...props}
      />
    </label>
  );
}

export default function EmptyStateIllustration({ title, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
      <div className="mx-auto h-12 w-12 rounded-full border border-white/20 bg-white/[0.04]" />
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}

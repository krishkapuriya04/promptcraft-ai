export default function DeploymentStatusBadge({ status }) {
  const classes =
    status === "ready"
      ? "border-emerald-300/40 bg-emerald-500/20 text-emerald-100"
      : status === "failed"
      ? "border-rose-300/40 bg-rose-500/20 text-rose-100"
      : "border-amber-300/40 bg-amber-500/20 text-amber-100";

  return <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${classes}`}>{status}</span>;
}

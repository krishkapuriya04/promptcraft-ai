export default function DeploymentLogsPanel({ logs = [] }) {
  return (
    <section className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Deployment Logs</p>
      <div className="max-h-40 space-y-1 overflow-auto font-mono text-xs text-slate-300">
        {logs.length === 0 ? <p className="text-slate-500">No logs yet.</p> : logs.map((line, idx) => <p key={`${idx}-${line}`}>{line}</p>)}
      </div>
    </section>
  );
}

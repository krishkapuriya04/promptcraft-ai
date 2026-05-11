function splitLines(code = "") {
  return code.split("\n");
}

export default function VersionDiffViewer({ fromCode = "", toCode = "" }) {
  const left = splitLines(fromCode);
  const right = splitLines(toCode);
  const max = Math.max(left.length, right.length);

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
        <p className="mb-2 text-xs uppercase tracking-[0.12em] text-slate-400">Previous</p>
        <div className="max-h-[420px] overflow-auto font-mono text-xs">
          {Array.from({ length: max }).map((_, index) => {
            const line = left[index] || "";
            const changed = line !== (right[index] || "");
            return (
              <div key={`l-${index}`} className={changed ? "bg-rose-500/10 text-rose-100" : "text-slate-300"}>
                {line || " "}
              </div>
            );
          })}
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
        <p className="mb-2 text-xs uppercase tracking-[0.12em] text-slate-400">Current</p>
        <div className="max-h-[420px] overflow-auto font-mono text-xs">
          {Array.from({ length: max }).map((_, index) => {
            const line = right[index] || "";
            const changed = line !== (left[index] || "");
            return (
              <div key={`r-${index}`} className={changed ? "bg-emerald-500/10 text-emerald-100" : "text-slate-300"}>
                {line || " "}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

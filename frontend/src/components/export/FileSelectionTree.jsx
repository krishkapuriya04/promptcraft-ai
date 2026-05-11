export default function FileSelectionTree({ files, selectedFiles, onToggleFile }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Files</p>
      <div className="max-h-48 space-y-1 overflow-auto">
        {files.length === 0 ? (
          <p className="text-xs text-slate-500">No files for selected export mode.</p>
        ) : (
          files.map((file) => (
            <label key={file} className="flex items-center gap-2 rounded px-1 py-1 text-xs text-slate-300 hover:bg-white/5">
              <input
                type="checkbox"
                checked={selectedFiles.includes(file)}
                onChange={() => onToggleFile(file)}
                className="accent-indigo-400"
              />
              <span className="truncate">{file}</span>
            </label>
          ))
        )}
      </div>
    </div>
  );
}

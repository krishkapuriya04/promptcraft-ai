export default function FileExplorerSidebar({ files, activeFileId, onSelectFile }) {
  return (
    <aside className="w-full rounded-xl border border-white/10 bg-slate-900/60 p-3 lg:w-56">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Files</h3>
      <div className="space-y-1">
        {files.map((file) => (
          <button
            key={file.id}
            type="button"
            onClick={() => onSelectFile(file.id)}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
              file.id === activeFileId ? "bg-brand-500/20 text-brand-100" : "text-slate-300 hover:bg-white/10"
            }`}
          >
            {file.name}
          </button>
        ))}
      </div>
    </aside>
  );
}

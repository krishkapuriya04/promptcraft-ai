export default function FileTabs({ files, activeFileId, onSelectFile }) {
  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {files.map((file) => (
        <button
          key={file.id}
          type="button"
          onClick={() => onSelectFile(file.id)}
          className={`rounded-lg border px-3 py-1.5 text-xs transition ${
            file.id === activeFileId
              ? "border-brand-300/40 bg-brand-500/20 text-brand-100"
              : "border-white/15 bg-white/[0.03] text-slate-300 hover:bg-white/10"
          }`}
        >
          {file.name}
        </button>
      ))}
    </div>
  );
}

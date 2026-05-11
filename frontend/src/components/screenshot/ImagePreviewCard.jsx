export default function ImagePreviewCard({ previewUrl, onRemove, onReplace }) {
  if (!previewUrl) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <img src={previewUrl} alt="Uploaded screenshot preview" className="max-h-56 w-full rounded-lg object-contain" />
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={onReplace} className="rounded-md border border-white/15 px-3 py-1 text-xs text-slate-200">
          Replace
        </button>
        <button type="button" onClick={onRemove} className="rounded-md border border-rose-300/30 px-3 py-1 text-xs text-rose-200">
          Remove
        </button>
      </div>
    </div>
  );
}

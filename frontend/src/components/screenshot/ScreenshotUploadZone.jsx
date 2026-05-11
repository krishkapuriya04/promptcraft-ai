export default function ScreenshotUploadZone({ onFileSelect, isGenerating }) {
  const onDrop = (event) => {
    event.preventDefault();
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) onFileSelect(dropped);
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
      className="rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-6 text-center"
    >
      <p className="text-sm text-slate-200">Drag & drop screenshot here</p>
      <p className="mt-1 text-xs text-slate-400">PNG / JPG / WebP up to 8MB</p>
      <label className="mt-4 inline-flex cursor-pointer rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-200">
        {isGenerating ? "Processing..." : "Select Screenshot"}
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          onChange={(event) => onFileSelect(event.target.files?.[0])}
          className="hidden"
          disabled={isGenerating}
        />
      </label>
    </div>
  );
}

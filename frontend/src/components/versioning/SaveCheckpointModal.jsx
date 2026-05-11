import BaseAccessibleModal from "../ui/BaseAccessibleModal";

export default function SaveCheckpointModal({
  isOpen,
  onClose,
  label,
  note,
  onLabelChange,
  onNoteChange,
  onSave,
}) {
  return (
    <BaseAccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      title="Save Checkpoint"
      zIndexClass="z-[93]"
      panelClassName="max-w-md rounded-xl"
    >
      <div className="mt-3 space-y-3">
        <div>
          <label htmlFor="checkpoint-label-input" className="mb-1 block text-xs font-medium text-slate-400">
            Checkpoint label
          </label>
          <input
            id="checkpoint-label-input"
            value={label}
            onChange={(event) => onLabelChange(event.target.value)}
            placeholder="e.g. Before hero redesign"
            autoComplete="off"
            className="h-10 w-full rounded-lg border border-white/15 bg-slate-950/50 px-3 text-sm text-slate-100"
          />
        </div>
        <div>
          <label htmlFor="checkpoint-note-input" className="mb-1 block text-xs font-medium text-slate-400">
            Optional note
          </label>
          <textarea
            id="checkpoint-note-input"
            value={note}
            onChange={(event) => onNoteChange(event.target.value)}
            placeholder="Context for your team"
            rows={4}
            className="w-full rounded-lg border border-white/15 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-300"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          className="rounded-lg border border-brand-300/40 bg-brand-500/20 px-3 py-1.5 text-xs text-brand-100"
        >
          Save Checkpoint
        </button>
      </div>
    </BaseAccessibleModal>
  );
}

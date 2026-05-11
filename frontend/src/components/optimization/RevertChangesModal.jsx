import BaseAccessibleModal from "../ui/BaseAccessibleModal";

export default function RevertChangesModal({ isOpen, onCancel, onConfirm }) {
  return (
    <BaseAccessibleModal
      isOpen={isOpen}
      onClose={onCancel}
      title="Revert optimization?"
      description="This will restore previous code and overwrite current editor content."
      zIndexClass="z-[95]"
      panelClassName="max-w-md rounded-xl"
    >
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-300"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-lg border border-rose-300/40 bg-rose-500/20 px-3 py-1.5 text-xs text-rose-100"
        >
          Revert
        </button>
      </div>
    </BaseAccessibleModal>
  );
}

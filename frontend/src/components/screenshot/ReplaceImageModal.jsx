import BaseAccessibleModal from "../ui/BaseAccessibleModal";

export default function ReplaceImageModal({ isOpen, onCancel, onConfirm }) {
  return (
    <BaseAccessibleModal
      isOpen={isOpen}
      onClose={onCancel}
      title="Replace screenshot?"
      description="Current uploaded image will be removed."
      zIndexClass="z-[92]"
      panelClassName="max-w-sm rounded-xl p-4"
    >
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-white/15 px-3 py-1 text-xs text-slate-300"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-md border border-emerald-300/30 px-3 py-1 text-xs text-emerald-200"
        >
          Replace
        </button>
      </div>
    </BaseAccessibleModal>
  );
}

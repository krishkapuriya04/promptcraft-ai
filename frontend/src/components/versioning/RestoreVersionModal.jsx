import BaseAccessibleModal from "../ui/BaseAccessibleModal";

export default function RestoreVersionModal({ isOpen, onCancel, onConfirm, version }) {
  const open = isOpen && Boolean(version);

  return (
    <BaseAccessibleModal
      isOpen={open}
      onClose={onCancel}
      title="Restore this version?"
      description={
        <>
          <span className="font-semibold text-white">{version?.label || "Selected version"}</span> will replace
          current editor content.
        </>
      }
      zIndexClass="z-[93]"
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
          className="rounded-lg border border-emerald-300/40 bg-emerald-500/20 px-3 py-1.5 text-xs text-emerald-100"
        >
          Restore
        </button>
      </div>
    </BaseAccessibleModal>
  );
}

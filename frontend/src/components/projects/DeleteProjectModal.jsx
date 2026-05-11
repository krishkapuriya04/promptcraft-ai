import Button from "../common/Button";
import BaseAccessibleModal from "../ui/BaseAccessibleModal";

export default function DeleteProjectModal({ isOpen, projectName, onCancel, onConfirm }) {
  return (
    <BaseAccessibleModal
      isOpen={isOpen}
      onClose={onCancel}
      title="Delete project?"
      description={
        <>
          This will permanently delete <span className="font-semibold text-white">{projectName}</span>.
        </>
      }
    >
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm} className="bg-rose-600 hover:bg-rose-500">
          Delete
        </Button>
      </div>
    </BaseAccessibleModal>
  );
}

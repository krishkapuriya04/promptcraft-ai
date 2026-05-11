import { useState } from "react";

export default function ProjectActionsDropdown({ onOpen, onEdit, onDuplicate, onExport, onDeploy, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  const actionButtonClass =
    "w-full rounded-md px-3 py-1.5 text-left text-xs text-slate-200 transition hover:bg-white/10";

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-lg border border-white/15 bg-white/[0.04] px-2 py-1 text-xs text-slate-200"
      >
        Actions
      </button>
      {isOpen ? (
        <div className="absolute right-0 z-30 mt-2 w-36 rounded-xl border border-white/10 bg-slate-900 p-1.5 shadow-2xl">
          <button type="button" className={actionButtonClass} onClick={() => { setIsOpen(false); onOpen(); }}>
            Open
          </button>
          <button type="button" className={actionButtonClass} onClick={() => { setIsOpen(false); onEdit(); }}>
            Edit
          </button>
          <button type="button" className={actionButtonClass} onClick={() => { setIsOpen(false); onDuplicate(); }}>
            Duplicate
          </button>
          <button type="button" className={actionButtonClass} onClick={() => { setIsOpen(false); onExport(); }}>
            Export
          </button>
          <button type="button" className={actionButtonClass} onClick={() => { setIsOpen(false); onDeploy(); }}>
            Deploy
          </button>
          <button type="button" className={`${actionButtonClass} text-rose-300`} onClick={() => { setIsOpen(false); onDelete(); }}>
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}

import { useRef } from "react";
import { useModalFocusTrap } from "../../hooks/useModalFocusTrap";
import VersionDiffViewer from "./VersionDiffViewer";

export default function VersionComparisonModal({ isOpen, onClose, comparison }) {
  const panelRef = useRef(null);
  const active = Boolean(isOpen && comparison);
  useModalFocusTrap({ isActive: active, onEscape: onClose, containerRef: panelRef });

  if (!isOpen || !comparison) return null;

  return (
    <div
      className="fixed inset-0 z-[92] overflow-auto bg-slate-950/80 px-4 py-6"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="version-compare-title"
        className="mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-slate-900 p-5 outline-none"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 id="version-compare-title" className="text-lg font-semibold text-white">
            Version Comparison
          </h3>
          <button type="button" onClick={onClose} className="rounded-lg border border-white/15 px-3 py-1 text-xs text-slate-300">
            Close
          </button>
        </div>
        <p className="mb-3 text-sm text-slate-300">{comparison.diffSummary}</p>
        <VersionDiffViewer fromCode={comparison.fromVersion?.code} toCode={comparison.toVersion?.code} />
      </div>
    </div>
  );
}

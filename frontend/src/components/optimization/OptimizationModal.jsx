import { useRef } from "react";
import { useModalFocusTrap } from "../../hooks/useModalFocusTrap";
import AIImproveButton from "./AIImproveButton";
import BeforeAfterPreview from "./BeforeAfterPreview";
import ImprovementHistoryPanel from "./ImprovementHistoryPanel";
import OptimizationSuggestions from "./OptimizationSuggestions";

export default function OptimizationModal({
  isOpen,
  onClose,
  availableCategories,
  selectedCategories,
  onToggleCategory,
  onImprove,
  isOptimizing,
  beforeCode,
  afterCode,
  suggestions,
  history,
  selectedHistoryIndex,
  onSelectHistoryIndex,
  onApply,
  onOpenRevert,
}) {
  const panelRef = useRef(null);
  useModalFocusTrap({ isActive: isOpen, onEscape: onClose, containerRef: panelRef });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] overflow-auto bg-slate-950/85 px-4 py-6"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="optimization-modal-title"
        className="mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-slate-900 p-5 outline-none"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 id="optimization-modal-title" className="text-lg font-semibold text-white">
            AI UI Improvement Workspace
          </h3>
          <button type="button" onClick={onClose} className="rounded-lg border border-white/15 px-3 py-1 text-xs text-slate-300">
            Close
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {availableCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onToggleCategory(category)}
              className={`rounded-full border px-3 py-1 text-xs ${
                selectedCategories.includes(category)
                  ? "border-brand-300/50 bg-brand-500/15 text-brand-100"
                  : "border-white/15 text-slate-300"
              }`}
            >
              {category}
            </button>
          ))}
          <AIImproveButton onClick={onImprove} isLoading={isOptimizing} />
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <BeforeAfterPreview beforeCode={beforeCode} afterCode={afterCode} />
            <div className="flex items-center justify-end gap-2">
              <button type="button" onClick={onOpenRevert} className="rounded-lg border border-rose-300/40 px-3 py-1.5 text-xs text-rose-100">
                Revert Improvements
              </button>
              <button
                type="button"
                onClick={onApply}
                disabled={!afterCode}
                className="rounded-lg border border-emerald-300/40 bg-emerald-500/20 px-3 py-1.5 text-xs text-emerald-100 disabled:opacity-50"
              >
                Apply Optimized Code
              </button>
            </div>
          </div>
          <div className="space-y-4 lg:col-span-4">
            <OptimizationSuggestions suggestions={suggestions} />
            <ImprovementHistoryPanel history={history} selectedIndex={selectedHistoryIndex} onSelect={onSelectHistoryIndex} />
          </div>
        </div>
      </div>
    </div>
  );
}

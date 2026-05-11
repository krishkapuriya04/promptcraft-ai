import { useId, useRef } from "react";
import { useModalFocusTrap } from "../../hooks/useModalFocusTrap";

/**
 * Accessible modal shell: backdrop click, Escape, focus trap, aria-modal.
 * Use for confirmation and form dialogs; pair with AnimatedModalWrapper when motion is needed.
 */
export default function BaseAccessibleModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  panelClassName = "",
  zIndexClass = "z-[80]",
}) {
  const panelRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useModalFocusTrap({
    isActive: isOpen,
    onEscape: onClose,
    containerRef: panelRef,
  });

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 ${zIndexClass} flex items-center justify-center bg-slate-950/70 px-4`}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={`w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-2xl outline-none ${panelClassName}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h3 id={titleId} className="text-lg font-semibold text-white">
          {title}
        </h3>
        {description ? (
          <div id={descriptionId} className="mt-2 text-sm text-slate-300">
            {description}
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}

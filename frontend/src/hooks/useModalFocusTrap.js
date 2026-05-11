import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

function getVisibleFocusables(root) {
  return Array.from(root.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (el) => el.offsetParent !== null || el.getClientRects().length > 0
  );
}

/**
 * Focus trap + Escape for modal dialogs. Keeps keyboard users inside the panel
 * until the modal closes, then restores focus to the previously focused element.
 */
export function useModalFocusTrap({ isActive, onEscape, containerRef }) {
  const onEscapeRef = useRef(onEscape);

  useEffect(() => {
    onEscapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!isActive || !containerRef.current) return undefined;

    const root = containerRef.current;
    const previouslyFocused = document.activeElement;

    const raf = requestAnimationFrame(() => {
      const list = getVisibleFocusables(root);
      list[0]?.focus();
    });

    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onEscapeRef.current?.();
        return;
      }
      if (e.key !== "Tab") return;

      const list = getVisibleFocusables(root);
      if (list.length === 0) return;

      const first = list[0];
      const last = list[list.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    root.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused instanceof HTMLElement && document.body.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [isActive, containerRef]);
}

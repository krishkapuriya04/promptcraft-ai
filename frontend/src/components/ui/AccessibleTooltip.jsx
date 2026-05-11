import { useId, useState } from "react";

export default function AccessibleTooltip({ label, children }) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();

  return (
    <span className="relative inline-flex">
      <span
        aria-describedby={tooltipId}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
      >
        {children}
      </span>
      {visible ? (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute -top-9 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/15 bg-slate-900 px-2 py-1 text-[11px] text-slate-100"
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}

import { useMemo, useRef } from "react";
import { EXPORT_FORMATS, EXPORT_OPTION_CARDS } from "../../constants/exportFormats";
import { useModalFocusTrap } from "../../hooks/useModalFocusTrap";
import { AnimatedModalWrapper } from "../ui";
import DownloadButton from "./DownloadButton";
import ExportOptionCard from "./ExportOptionCard";
import ExportProgressBar from "./ExportProgressBar";
import ExportSuccessState from "./ExportSuccessState";
import FileSelectionTree from "./FileSelectionTree";

export default function ExportModal({
  isOpen,
  onClose,
  projectName,
  format,
  onFormatChange,
  fileMap,
  selectedFiles,
  onToggleFile,
  isLoadingOptions,
  isExporting,
  progress,
  isSuccess,
  onResetSuccess,
  onExport,
}) {
  const filesForFormat = useMemo(() => fileMap[format] || [], [fileMap, format]);
  const dialogRef = useRef(null);

  useModalFocusTrap({ isActive: isOpen, onEscape: onClose, containerRef: dialogRef });

  return (
    <AnimatedModalWrapper isOpen={isOpen}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-modal-title"
        className="fixed inset-0 z-[90] flex items-center justify-center px-4 outline-none"
      >
        <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 id="export-modal-title" className="text-lg font-semibold text-white">
              Export Project
            </h3>
            <p className="text-sm text-slate-300">{projectName}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg border border-white/15 px-3 py-1 text-xs text-slate-300">
            Close
          </button>
        </div>

        {isSuccess ? (
          <ExportSuccessState onClose={onClose} onAnother={onResetSuccess} />
        ) : (
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              {EXPORT_OPTION_CARDS.map((option) => (
                <ExportOptionCard key={option.id} option={option} isSelected={format === option.id} onSelect={onFormatChange} />
              ))}
            </div>

            {isLoadingOptions ? (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">Loading export options...</div>
            ) : (
              <FileSelectionTree files={format === EXPORT_FORMATS.COPY_FULL_CODE ? [] : filesForFormat} selectedFiles={selectedFiles} onToggleFile={onToggleFile} />
            )}

            {progress > 0 ? <ExportProgressBar progress={progress} /> : null}

            <DownloadButton onClick={onExport} isLoading={isExporting} label={format === EXPORT_FORMATS.COPY_FULL_CODE ? "Copy Full Code" : "Export & Download"} />
          </div>
        )}
        </div>
      </div>
    </AnimatedModalWrapper>
  );
}

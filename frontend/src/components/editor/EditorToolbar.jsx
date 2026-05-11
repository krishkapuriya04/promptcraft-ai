import Button from "../common/Button";
import { AIImproveButton } from "../optimization";
import { AccessibleTooltip } from "../ui";

export default function EditorToolbar({
  projectName,
  onCopy,
  onReset,
  onSave,
  onFormat,
  onToggleMinimap,
  onToggleFullscreen,
  onRefreshPreview,
  onExport,
  onDeploy,
  onImproveUI,
  onVersionHistory,
  onCheckpoint,
  isImprovingUI,
  showMinimap,
  isFullscreen,
  isSaving,
}) {
  return (
    <div className="mb-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-white">{projectName || "Editor Workspace"}</h2>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={onCopy} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-200">
            Copy
          </button>
          <button type="button" onClick={onReset} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-200">
            Reset
          </button>
          <AccessibleTooltip label="Format current file">
            <button type="button" onClick={onFormat} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-200">
              Format
            </button>
          </AccessibleTooltip>
          <button type="button" onClick={onToggleMinimap} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-200">
            {showMinimap ? "Hide Minimap" : "Show Minimap"}
          </button>
          <button type="button" onClick={onRefreshPreview} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-200">
            Refresh Preview
          </button>
          <button type="button" onClick={onExport} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-200">
            Export Project
          </button>
          <button type="button" onClick={onDeploy} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-200">
            Deploy Project
          </button>
          <AIImproveButton onClick={onImproveUI} isLoading={isImprovingUI} />
          <button type="button" onClick={onVersionHistory} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-200">
            Version History
          </button>
          <button type="button" onClick={onCheckpoint} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-200">
            Save Checkpoint
          </button>
          <button type="button" onClick={onToggleFullscreen} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-200">
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
          <Button onClick={onSave} isLoading={isSaving} size="sm">
            Save Version
          </Button>
        </div>
      </div>
    </div>
  );
}

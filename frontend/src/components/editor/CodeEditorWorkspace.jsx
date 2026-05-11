import { useEffect, useMemo, useRef, useState } from "react";
import { usePreviewState } from "../../hooks/usePreviewState";
import { useCodeEditorWorkspace } from "../../hooks/useCodeEditorWorkspace";
import { useProjectExport } from "../../hooks/useProjectExport";
import { useUIOptimization } from "../../hooks/useUIOptimization";
import { useVersionHistory } from "../../hooks/useVersionHistory";
import { ExportModal } from "../export";
import { DeployProjectModal } from "../deployment";
import { OptimizationModal, RevertChangesModal } from "../optimization";
import {
  RestoreVersionModal,
  SaveCheckpointModal,
  VersionComparisonModal,
  VersionTimeline,
} from "../versioning";
import CodeEditorLoader from "./CodeEditorLoader";
import EditorErrorFallback from "./EditorErrorFallback";
import EditorToolbar from "./EditorToolbar";
import FileExplorerSidebar from "./FileExplorerSidebar";
import FileTabs from "./FileTabs";
import MonacoEditorPanel from "./MonacoEditorPanel";
import PreviewSplitView from "./PreviewSplitView";
import { useDeploymentManager } from "../../hooks/useDeploymentManager";

export default function CodeEditorWorkspace({ projectId }) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mobilePanel, setMobilePanel] = useState("editor");
  const [debouncedCode, setDebouncedCode] = useState("");

  const workspace = useCodeEditorWorkspace(projectId);
  const previewState = usePreviewState({
    code: debouncedCode,
    title: workspace.project?.name || "Live Editor Preview",
  });
  const exportWorkspace = useProjectExport({
    projectId: workspace.project?._id,
    projectCode: workspace.previewCode,
  });
  const deploymentWorkspace = useDeploymentManager({
    projectId: workspace.project?._id,
    sourceVersion: workspace.project?.version,
  });
  const optimizationWorkspace = useUIOptimization({
    projectId: workspace.project?._id,
    currentCode: workspace.previewCode,
    onApplyOptimizedCode: async (code) => {
      workspace.applyCodeToAppFile(code);
      await workspace.saveEditedVersion();
    },
  });
  const versionWorkspace = useVersionHistory({
    projectId: workspace.project?._id,
    currentCode: workspace.previewCode,
    onRestore: async (code) => {
      workspace.applyCodeToAppFile(code);
      await workspace.saveEditedVersion();
    },
  });

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedCode(workspace.previewCode), 350);
    return () => window.clearTimeout(timeout);
  }, [workspace.previewCode]);

  useEffect(() => {
    function onPointerMove(event) {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const nextRatio = ((event.clientX - rect.left) / rect.width) * 100;
      workspace.setSplitRatio(Math.min(75, Math.max(35, nextRatio)));
    }
    function onPointerUp() {
      setIsDragging(false);
    }
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
    };
  }, [isDragging, workspace]);

  const splitTemplate = useMemo(() => `${workspace.splitRatio}% 10px ${100 - workspace.splitRatio}%`, [workspace.splitRatio]);

  if (workspace.isLoading) return <CodeEditorLoader />;
  if (workspace.error) return <EditorErrorFallback message={workspace.error} onRetry={workspace.reload} />;

  const editorPanel = (
    <section className={workspace.isFullscreenEditor ? "fixed inset-0 z-[70] bg-slate-950 p-4" : ""}>
      <EditorToolbar
        projectName={workspace.project?.name}
        onCopy={workspace.copyActiveFile}
        onReset={workspace.resetChanges}
        onSave={workspace.saveEditedVersion}
        onFormat={() => editorRef.current?.getAction("editor.action.formatDocument")?.run()}
        onToggleMinimap={() => workspace.setShowMinimap((prev) => !prev)}
        onToggleFullscreen={() => workspace.setIsFullscreenEditor((prev) => !prev)}
        onRefreshPreview={previewState.refreshPreview}
        onExport={() => exportWorkspace.openModal()}
        onDeploy={deploymentWorkspace.openModal}
        onImproveUI={optimizationWorkspace.openModal}
        onVersionHistory={versionWorkspace.openHistory}
        onCheckpoint={() => versionWorkspace.setCheckpointModalOpen(true)}
        isImprovingUI={optimizationWorkspace.isOptimizing}
        showMinimap={workspace.showMinimap}
        isFullscreen={workspace.isFullscreenEditor}
        isSaving={workspace.isSaving}
      />
      <FileTabs files={workspace.files} activeFileId={workspace.activeFileId} onSelectFile={workspace.setActiveFileId} />
      <MonacoEditorPanel
        file={workspace.activeFile}
        onChange={workspace.updateActiveFileContent}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        showMinimap={workspace.showMinimap}
        height={workspace.isFullscreenEditor ? "calc(100vh - 120px)" : "540px"}
      />
    </section>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobilePanel("editor")}
          className={`rounded-md px-3 py-1 text-xs ${mobilePanel === "editor" ? "bg-brand-500/20 text-brand-100" : "text-slate-300"}`}
        >
          Editor
        </button>
        <button
          type="button"
          onClick={() => setMobilePanel("preview")}
          className={`rounded-md px-3 py-1 text-xs ${mobilePanel === "preview" ? "bg-brand-500/20 text-brand-100" : "text-slate-300"}`}
        >
          Preview
        </button>
      </div>

      <div className="flex gap-4 lg:hidden">
        <FileExplorerSidebar files={workspace.files} activeFileId={workspace.activeFileId} onSelectFile={workspace.setActiveFileId} />
      </div>

      <div ref={containerRef} className="hidden gap-4 lg:grid" style={{ gridTemplateColumns: splitTemplate }}>
        <div className="min-w-0 space-y-3">
          <div className="flex gap-3">
            <FileExplorerSidebar files={workspace.files} activeFileId={workspace.activeFileId} onSelectFile={workspace.setActiveFileId} />
            <div className="min-w-0 flex-1">{editorPanel}</div>
          </div>
        </div>
        <button
          type="button"
          aria-label="Resize editor preview split"
          onMouseDown={() => setIsDragging(true)}
          className="cursor-col-resize rounded bg-white/10 hover:bg-white/20"
        />
        <div className="min-w-0">
          <PreviewSplitView previewState={previewState} code={debouncedCode} title={workspace.project?.name} />
        </div>
      </div>

      <div className="space-y-4 lg:hidden">
        {mobilePanel === "editor" ? editorPanel : <PreviewSplitView previewState={previewState} code={debouncedCode} title={workspace.project?.name} />}
      </div>

      <ExportModal
        isOpen={exportWorkspace.isOpen}
        onClose={exportWorkspace.closeModal}
        projectName={workspace.project?.name || "Project"}
        format={exportWorkspace.format}
        onFormatChange={exportWorkspace.changeFormat}
        fileMap={exportWorkspace.fileMap}
        selectedFiles={exportWorkspace.selectedFiles}
        onToggleFile={exportWorkspace.toggleFileSelection}
        isLoadingOptions={exportWorkspace.isLoadingOptions}
        isExporting={exportWorkspace.isExporting}
        progress={exportWorkspace.progress}
        isSuccess={exportWorkspace.isSuccess}
        onResetSuccess={exportWorkspace.resetSuccess}
        onExport={exportWorkspace.runExport}
      />

      <DeployProjectModal
        isOpen={deploymentWorkspace.isOpen}
        onClose={() => deploymentWorkspace.setIsOpen(false)}
        provider={deploymentWorkspace.provider}
        providers={deploymentWorkspace.providers}
        onProviderChange={deploymentWorkspace.setProvider}
        onDeploy={deploymentWorkspace.deploy}
        isDeploying={deploymentWorkspace.isDeploying}
        progress={deploymentWorkspace.progress}
        activeDeployment={deploymentWorkspace.activeDeployment}
        history={deploymentWorkspace.history}
        onRedeploy={deploymentWorkspace.redeploy}
        onSelectHistory={deploymentWorkspace.setActiveDeployment}
      />

      <OptimizationModal
        isOpen={optimizationWorkspace.isOpen}
        onClose={() => optimizationWorkspace.setIsOpen(false)}
        availableCategories={optimizationWorkspace.availableCategories}
        selectedCategories={optimizationWorkspace.categories}
        onToggleCategory={optimizationWorkspace.toggleCategory}
        onImprove={optimizationWorkspace.runOptimization}
        isOptimizing={optimizationWorkspace.isOptimizing}
        beforeCode={workspace.previewCode}
        afterCode={optimizationWorkspace.optimizedCode}
        suggestions={optimizationWorkspace.suggestions}
        history={optimizationWorkspace.history}
        selectedHistoryIndex={optimizationWorkspace.selectedHistoryIndex}
        onSelectHistoryIndex={optimizationWorkspace.setSelectedHistoryIndex}
        onApply={optimizationWorkspace.applyOptimizedCode}
        onOpenRevert={() => optimizationWorkspace.setIsRevertModalOpen(true)}
      />

      <RevertChangesModal
        isOpen={optimizationWorkspace.isRevertModalOpen}
        onCancel={() => optimizationWorkspace.setIsRevertModalOpen(false)}
        onConfirm={optimizationWorkspace.revertOptimization}
      />

      {versionWorkspace.isOpen ? (
        <div className="fixed inset-0 z-[91] overflow-auto bg-slate-950/85 px-4 py-6">
          <div className="mx-auto w-full max-w-4xl rounded-2xl border border-white/10 bg-slate-900 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Version History</h3>
              <div className="flex items-center gap-2">
                <input
                  value={versionWorkspace.search}
                  onChange={(event) => versionWorkspace.setSearch(event.target.value)}
                  placeholder="Search versions..."
                  className="h-9 rounded-lg border border-white/15 bg-slate-950/50 px-3 text-xs text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => versionWorkspace.loadVersions()}
                  className="rounded-lg border border-white/15 px-3 py-1 text-xs text-slate-200"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => versionWorkspace.setIsOpen(false)}
                  className="rounded-lg border border-white/15 px-3 py-1 text-xs text-slate-200"
                >
                  Close
                </button>
              </div>
            </div>
            <VersionTimeline
              versions={versionWorkspace.versions}
              isLoading={versionWorkspace.isLoading}
              onCompare={versionWorkspace.compareWithCurrent}
              onRestore={(version) => versionWorkspace.setRestoreModal({ open: true, version })}
              onDelete={versionWorkspace.deleteVersion}
              onToggleFavorite={versionWorkspace.toggleFavoriteVersion}
            />
          </div>
        </div>
      ) : null}

      <VersionComparisonModal
        isOpen={versionWorkspace.compareModal.open}
        onClose={() => versionWorkspace.setCompareModal({ open: false, data: null })}
        comparison={versionWorkspace.compareModal.data}
      />

      <RestoreVersionModal
        isOpen={versionWorkspace.restoreModal.open}
        version={versionWorkspace.restoreModal.version}
        onCancel={() => versionWorkspace.setRestoreModal({ open: false, version: null })}
        onConfirm={versionWorkspace.restoreVersion}
      />

      <SaveCheckpointModal
        isOpen={versionWorkspace.checkpointModalOpen}
        onClose={() => versionWorkspace.setCheckpointModalOpen(false)}
        label={versionWorkspace.checkpointForm.label}
        note={versionWorkspace.checkpointForm.note}
        onLabelChange={(value) => versionWorkspace.setCheckpointForm((prev) => ({ ...prev, label: value }))}
        onNoteChange={(value) => versionWorkspace.setCheckpointForm((prev) => ({ ...prev, note: value }))}
        onSave={versionWorkspace.saveCheckpoint}
      />
    </div>
  );
}

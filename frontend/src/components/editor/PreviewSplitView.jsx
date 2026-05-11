import { useMemo } from "react";
import { PreviewFrame, PreviewToolbar } from "../preview";

export default function PreviewSplitView({
  previewState,
  code,
  title,
}) {
  const localPreview = useMemo(
    () => ({
      ...previewState,
      srcDoc: previewState.srcDoc,
    }),
    [previewState]
  );

  if (!code) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm text-slate-400">
        No renderable code in active editor context.
      </div>
    );
  }

  return (
    <section>
      <PreviewToolbar
        device={localPreview.device}
        onDeviceChange={localPreview.setDevice}
        onRefresh={localPreview.refreshPreview}
        onToggleFullscreen={() => localPreview.setIsFullscreen((prev) => !prev)}
        onToggleOpen={() => localPreview.setIsPreviewOpen((prev) => !prev)}
        isFullscreen={localPreview.isFullscreen}
        isOpen={localPreview.isPreviewOpen}
      />
      <PreviewFrame
        srcDoc={localPreview.srcDoc}
        device={localPreview.device}
        isRendering={localPreview.isRendering}
        error={localPreview.renderError}
        onRefresh={localPreview.refreshPreview}
        isFullscreen={localPreview.isFullscreen}
        title={title}
      />
    </section>
  );
}

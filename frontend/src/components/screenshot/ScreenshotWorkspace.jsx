import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useScreenshotGeneration } from "../../hooks/useScreenshotGeneration";
import Button from "../common/Button";
import DesignAnalysisPanel from "./DesignAnalysisPanel";
import ImagePreviewCard from "./ImagePreviewCard";
import ReplaceImageModal from "./ReplaceImageModal";
import ScreenshotAnalysisLoader from "./ScreenshotAnalysisLoader";
import ScreenshotGenerationHistory from "./ScreenshotGenerationHistory";
import ScreenshotUploadZone from "./ScreenshotUploadZone";
import UploadProgressBar from "./UploadProgressBar";

export default function ScreenshotWorkspace() {
  const [replaceModalOpen, setReplaceModalOpen] = useState(false);
  const {
    file,
    previewUrl,
    uploadProgress,
    isGenerating,
    analysis,
    analysisSummary,
    history,
    selectFile,
    clearFile,
    generateFromScreenshot,
    setAnalysis,
    demoScreenshotMode,
  } = useScreenshotGeneration();

  const showDemoScreenshotBadge = Boolean(demoScreenshotMode || analysis?.demoMode);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-white">Generate from Screenshot</h3>
            {showDemoScreenshotBadge ? (
              <span
                className="rounded-full border border-cyan-400/35 bg-cyan-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-100"
                title="Vision API unavailable or failed; using local demo inference and templates."
              >
                Demo Screenshot Mode
              </span>
            ) : null}
          </div>
          <p className="text-sm text-slate-300">Upload a UI screenshot and generate responsive React + Tailwind code.</p>
        </div>
        <Button onClick={generateFromScreenshot} isLoading={isGenerating} disabled={!file || isGenerating}>
          {isGenerating ? "Analyzing..." : "Generate from Screenshot"}
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-8">
          {!previewUrl ? <ScreenshotUploadZone onFileSelect={selectFile} isGenerating={isGenerating} /> : null}
          <ImagePreviewCard
            previewUrl={previewUrl}
            onRemove={clearFile}
            onReplace={() => setReplaceModalOpen(true)}
          />
          <UploadProgressBar progress={uploadProgress} />
          {isGenerating ? <ScreenshotAnalysisLoader /> : null}
          <DesignAnalysisPanel
            summary={analysisSummary.summary}
            colors={analysisSummary.colors}
            sections={analysisSummary.sections}
          />
          {analysis ? (
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{analysis.title}</p>
                <Link
                  to={ROUTES.PROJECT_EDITOR.replace(":projectId", analysis.projectId || analysis._id)}
                  className="text-xs font-medium text-cyan-200"
                >
                  Edit in Monaco
                </Link>
              </div>
              <pre className="max-h-52 overflow-auto text-xs text-slate-300">{analysis.generatedCode}</pre>
            </div>
          ) : null}
        </div>
        <div className="lg:col-span-4">
          <ScreenshotGenerationHistory
            history={history}
            onSelect={(item) =>
              setAnalysis({
                ...item,
                projectId: item.projectId || item._id,
                detectedDesignSummary: item.detectedDesignSummary || item.description || "",
                detectedColors: Array.isArray(item.detectedColors) ? item.detectedColors : [],
                detectedSections: Array.isArray(item.detectedSections) ? item.detectedSections : [],
              })
            }
          />
        </div>
      </div>

      <ReplaceImageModal
        isOpen={replaceModalOpen}
        onCancel={() => setReplaceModalOpen(false)}
        onConfirm={() => {
          clearFile();
          setReplaceModalOpen(false);
        }}
      />
    </section>
  );
}

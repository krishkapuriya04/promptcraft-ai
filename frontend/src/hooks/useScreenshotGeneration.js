import { useEffect, useMemo, useState } from "react";
import { screenshotService } from "../services/screenshotService";
import { getApiErrorMessage } from "../utils/apiError";
import { useToast } from "./useToast";

const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/jpg", "image/webp"]);

export function useScreenshotGeneration() {
  const { showToast } = useToast();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [demoScreenshotMode, setDemoScreenshotMode] = useState(false);

  useEffect(() => {
    async function loadHistory() {
      try {
        const response = await screenshotService.history();
        setHistory(response.data.history || []);
        setDemoScreenshotMode(Boolean(response.data.demoScreenshotMode));
      } catch {
        // Keep non-blocking for workspace startup.
      }
    }
    loadHistory();
  }, []);

  const selectFile = (nextFile) => {
    if (!nextFile) return;
    if (!ALLOWED_TYPES.has(nextFile.type)) {
      showToast({ type: "error", message: "Only PNG, JPG, and WebP are supported." });
      return;
    }
    if (nextFile.size > 8 * 1024 * 1024) {
      showToast({ type: "error", message: "File exceeds 8MB limit." });
      return;
    }
    setFile(nextFile);
    setPreviewUrl(URL.createObjectURL(nextFile));
    setAnalysis(null);
    setUploadProgress(0);
  };

  const clearFile = () => {
    setFile(null);
    setPreviewUrl("");
    setUploadProgress(0);
  };

  const generateFromScreenshot = async () => {
    if (!file) {
      showToast({ type: "error", message: "Please upload a screenshot first." });
      return;
    }
    setIsGenerating(true);
    try {
      const response = await screenshotService.generate(file, (event) => {
        if (!event.total) return;
        setUploadProgress(Math.round((event.loaded * 100) / event.total));
      });
      const generation = response.data.generation;
      setAnalysis(generation);
      if (generation.demoMode) {
        setDemoScreenshotMode(true);
      }
      setHistory((prev) => [
        {
          _id: generation.projectId,
          projectId: generation.projectId,
          title: generation.title,
          description: generation.description,
          generatedCode: generation.generatedCode,
          detectedSections: generation.detectedSections,
          createdAt: new Date().toISOString(),
          demoMode: Boolean(generation.demoMode),
        },
        ...prev,
      ]);
      showToast({
        type: "success",
        message: generation.demoMode
          ? "Screenshot demo site generated (Demo Screenshot Mode)."
          : "Screenshot website generated successfully.",
      });
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Screenshot generation failed.") });
    } finally {
      setIsGenerating(false);
    }
  };

  const analysisSummary = useMemo(
    () => ({
      summary: analysis?.detectedDesignSummary || "",
      colors: analysis?.detectedColors || [],
      sections: analysis?.detectedSections || [],
    }),
    [analysis]
  );

  return {
    file,
    previewUrl,
    uploadProgress,
    isGenerating,
    analysis,
    analysisSummary,
    history,
    demoScreenshotMode,
    selectFile,
    clearFile,
    generateFromScreenshot,
    setAnalysis,
  };
}

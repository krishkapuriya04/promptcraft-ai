import { useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "./useToast";
import { aiService } from "../services/aiService";
import { getApiErrorMessage } from "../utils/apiError";

const DEFAULT_FORM = {
  prompt: "",
  category: "SaaS",
  theme: "Modern Gradient",
};

const DEFAULT_OPTIONS = { categories: [], themes: [], demoMode: false };

export function useAIGeneration() {
  const { showToast } = useToast();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [history, setHistory] = useState([]);
  const [selectedGenerationId, setSelectedGenerationId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [optionsResponse, historyResponse] = await Promise.all([aiService.getOptions(), aiService.history()]);
      setOptions({ ...DEFAULT_OPTIONS, ...optionsResponse.data });
      setHistory(historyResponse.data.history);
      if (historyResponse.data.history.length > 0) {
        setSelectedGenerationId(historyResponse.data.history[0]._id);
      }
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Failed to load AI workspace.") });
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    let isMounted = true;

    async function bootstrapWorkspace() {
      try {
        const [optionsResponse, historyResponse] = await Promise.all([aiService.getOptions(), aiService.history()]);
        if (!isMounted) return;
        setOptions({ ...DEFAULT_OPTIONS, ...optionsResponse.data });
        setHistory(historyResponse.data.history);
        if (historyResponse.data.history.length > 0) {
          setSelectedGenerationId(historyResponse.data.history[0]._id);
        }
      } catch (error) {
        if (isMounted) {
          showToast({ type: "error", message: getApiErrorMessage(error, "Failed to load AI workspace.") });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    bootstrapWorkspace();
    return () => {
      isMounted = false;
    };
  }, [showToast]);

  const selectedGeneration = useMemo(
    () => history.find((item) => item._id === selectedGenerationId) || null,
    [history, selectedGenerationId]
  );

  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const generateWebsite = async () => {
    if (form.prompt.trim().length < 20) {
      showToast({ type: "error", message: "Prompt must be at least 20 characters." });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await aiService.generate({
        prompt: form.prompt,
        category: form.category,
        theme: form.theme,
      });
      const { generation } = response.data;
      const newEntry = {
        _id: generation.projectId,
        title: generation.title,
        description: generation.description,
        category: generation.category,
        theme: form.theme,
        prompt: form.prompt,
        generatedCode: generation.generatedCode,
        createdAt: new Date().toISOString(),
        demoMode: Boolean(generation.demoMode),
        detectedSections: Array.isArray(generation.detectedSections) ? generation.detectedSections : [],
      };
      setHistory((prev) => [newEntry, ...prev]);
      setSelectedGenerationId(newEntry._id);
      showToast({
        type: "success",
        message: generation.demoMode
          ? "Demo site generated (Demo Mode — add OPENAI_API_KEY for live AI)."
          : "Website generated successfully.",
      });
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Generation failed. Please retry.") });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    form,
    options,
    history,
    isLoading,
    isGenerating,
    selectedGeneration,
    selectedGenerationId,
    setSelectedGenerationId,
    updateForm,
    generateWebsite,
    reload: loadData,
  };
}

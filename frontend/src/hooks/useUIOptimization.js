import { useState } from "react";
import { optimizationService } from "../services/optimizationService";
import { getApiErrorMessage } from "../utils/apiError";
import { useToast } from "./useToast";

export function useUIOptimization({ projectId, currentCode, onApplyOptimizedCode }) {
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedCode, setOptimizedCode] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [isRevertModalOpen, setIsRevertModalOpen] = useState(false);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(0);

  const openModal = async () => {
    setIsOpen(true);
    setIsLoadingOptions(true);
    try {
      const response = await optimizationService.options();
      setAvailableCategories(response.data.categories);
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Failed to load optimization options.") });
    } finally {
      setIsLoadingOptions(false);
    }
  };

  const toggleCategory = (category) => {
    setCategories((prev) => (prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]));
  };

  const runOptimization = async () => {
    if (!projectId || !currentCode) return;
    setIsOptimizing(true);
    try {
      const response = await optimizationService.improve({ projectId, code: currentCode, categories });
      setOptimizedCode(response.data.optimizedCode);
      setSuggestions(response.data.suggestions);
      setHistory(response.data.history);
      showToast({ type: "success", message: "UI optimization complete. Review and apply changes." });
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Optimization failed.") });
    } finally {
      setIsOptimizing(false);
    }
  };

  const applyOptimizedCode = () => {
    if (!optimizedCode) return;
    onApplyOptimizedCode(optimizedCode);
    showToast({ type: "success", message: "Optimized code applied to editor." });
    setIsOpen(false);
  };

  const revertOptimization = async () => {
    try {
      const response = await optimizationService.revert({ projectId, historyIndex: selectedHistoryIndex });
      onApplyOptimizedCode(response.data.revertedCode);
      showToast({ type: "success", message: "Optimization reverted." });
      setIsRevertModalOpen(false);
      setIsOpen(false);
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Failed to revert optimization.") });
    }
  };

  return {
    isOpen,
    setIsOpen,
    openModal,
    categories,
    toggleCategory,
    availableCategories,
    isLoadingOptions,
    isOptimizing,
    optimizedCode,
    suggestions,
    history,
    runOptimization,
    applyOptimizedCode,
    isRevertModalOpen,
    setIsRevertModalOpen,
    selectedHistoryIndex,
    setSelectedHistoryIndex,
    revertOptimization,
  };
}

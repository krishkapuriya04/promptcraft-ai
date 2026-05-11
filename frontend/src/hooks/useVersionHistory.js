import { useState } from "react";
import { versionService } from "../services/versionService";
import { getApiErrorMessage } from "../utils/apiError";
import { useToast } from "./useToast";

export function useVersionHistory({ projectId, currentCode, onRestore }) {
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [versions, setVersions] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [compareModal, setCompareModal] = useState({ open: false, data: null });
  const [restoreModal, setRestoreModal] = useState({ open: false, version: null });
  const [checkpointModalOpen, setCheckpointModalOpen] = useState(false);
  const [checkpointForm, setCheckpointForm] = useState({ label: "", note: "" });

  const loadVersions = async (params = {}) => {
    if (!projectId) return;
    setIsLoading(true);
    try {
      const response = await versionService.list(projectId, { search, ...params });
      setVersions(response.data.versions);
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Failed to load versions.") });
    } finally {
      setIsLoading(false);
    }
  };

  const openHistory = async () => {
    setIsOpen(true);
    await loadVersions();
  };

  const saveCheckpoint = async () => {
    try {
      await versionService.saveCheckpoint(projectId, {
        code: currentCode,
        label: checkpointForm.label,
        note: checkpointForm.note,
      });
      showToast({ type: "success", message: "Checkpoint saved." });
      setCheckpointModalOpen(false);
      setCheckpointForm({ label: "", note: "" });
      await loadVersions();
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Failed to save checkpoint.") });
    }
  };

  const compareWithCurrent = async (versionId) => {
    try {
      const response = await versionService.compare(projectId, {
        fromVersionId: versionId,
        toVersionId: "current",
      });
      setCompareModal({ open: true, data: response.data });
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Failed to compare versions.") });
    }
  };

  const restoreVersion = async () => {
    const version = restoreModal.version;
    if (!version) return;
    try {
      const response = await versionService.restore(projectId, version._id);
      onRestore(response.data.project.generatedCode);
      showToast({ type: "success", message: "Version restored." });
      setRestoreModal({ open: false, version: null });
      await loadVersions();
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Failed to restore version.") });
    }
  };

  const deleteVersion = async (versionId) => {
    try {
      await versionService.remove(projectId, versionId);
      await loadVersions();
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Failed to delete version.") });
    }
  };

  const toggleFavoriteVersion = async (versionId) => {
    try {
      await versionService.toggleFavorite(projectId, versionId);
      await loadVersions();
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Failed to update favorite version.") });
    }
  };

  return {
    isOpen,
    setIsOpen,
    openHistory,
    versions,
    search,
    setSearch,
    isLoading,
    loadVersions,
    compareModal,
    setCompareModal,
    restoreModal,
    setRestoreModal,
    checkpointModalOpen,
    setCheckpointModalOpen,
    checkpointForm,
    setCheckpointForm,
    saveCheckpoint,
    compareWithCurrent,
    restoreVersion,
    deleteVersion,
    toggleFavoriteVersion,
  };
}

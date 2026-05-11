import { useCallback, useState } from "react";
import { EXPORT_FORMATS } from "../constants/exportFormats";
import { exportService } from "../services/exportService";
import { getApiErrorMessage } from "../utils/apiError";
import { useToast } from "./useToast";

function triggerDownload(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(url);
}

export function useProjectExport({ projectId, projectCode = "" }) {
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [format, setFormat] = useState(EXPORT_FORMATS.REACT_ZIP);
  const [fileMap, setFileMap] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const loadOptions = useCallback(async () => {
    if (!projectId) return;
    setIsLoadingOptions(true);
    try {
      const response = await exportService.options(projectId);
      setFileMap(response.data.files);
      const defaultFiles = response.data.files[format] || [];
      setSelectedFiles(defaultFiles);
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Failed to load export options.") });
    } finally {
      setIsLoadingOptions(false);
    }
  }, [projectId, format, showToast]);

  const openModal = async () => {
    setIsOpen(true);
    await loadOptions();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const changeFormat = (nextFormat) => {
    setFormat(nextFormat);
    setSelectedFiles(fileMap[nextFormat] || []);
  };

  const toggleFileSelection = (filePath) => {
    setSelectedFiles((prev) =>
      prev.includes(filePath) ? prev.filter((item) => item !== filePath) : [...prev, filePath]
    );
  };

  const runExport = async () => {
    if (!projectId) return;
    if (format === EXPORT_FORMATS.COPY_FULL_CODE) {
      await navigator.clipboard.writeText(projectCode);
      showToast({ type: "success", message: "Full project code copied." });
      setIsSuccess(true);
      return;
    }

    setIsExporting(true);
    setProgress(10);
    try {
      const timer = window.setInterval(() => {
        setProgress((prev) => (prev < 85 ? prev + 7 : prev));
      }, 180);
      const response = await exportService.archive({ projectId, format, selectedFiles });
      window.clearInterval(timer);
      setProgress(100);
      const disposition = response.headers["content-disposition"] || "";
      const filenameMatch = disposition.match(/filename="(.+)"/);
      const filename = filenameMatch?.[1] || `promptcraft-${format}.zip`;
      triggerDownload(response.data, filename);
      setIsSuccess(true);
      showToast({ type: "success", message: "Export completed successfully." });
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Export failed. Please retry.") });
    } finally {
      setTimeout(() => setProgress(0), 700);
      setIsExporting(false);
    }
  };

  const resetSuccess = () => setIsSuccess(false);

  return {
    isOpen,
    setIsOpen,
    openModal,
    closeModal,
    format,
    setFormat,
    changeFormat,
    fileMap,
    selectedFiles,
    isLoadingOptions,
    isExporting,
    progress,
    isSuccess,
    resetSuccess,
    toggleFileSelection,
    runExport,
  };
}

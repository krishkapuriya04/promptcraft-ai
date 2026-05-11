import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_EDITOR_FILES, EDITOR_STORAGE_PREFIX } from "../constants/editor";
import { useToast } from "./useToast";
import { projectService } from "../services/projectService";
import { getApiErrorMessage } from "../utils/apiError";

function getStorageKey(projectId) {
  return `${EDITOR_STORAGE_PREFIX}${projectId}`;
}

function normalizeFiles(projectCode, projectName) {
  const files = DEFAULT_EDITOR_FILES.map((file) => ({ ...file }));
  files[0].content = projectCode || `export default function App() {\n  return <div className="p-6 text-white">Welcome to ${projectName}</div>;\n}`;
  return files;
}

export function useCodeEditorWorkspace(projectId) {
  const { showToast } = useToast();
  const [project, setProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [activeFileId, setActiveFileId] = useState("app");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isFullscreenEditor, setIsFullscreenEditor] = useState(false);
  const [showMinimap, setShowMinimap] = useState(true);
  const [splitRatio, setSplitRatio] = useState(56);
  const autosaveRef = useRef(null);

  const activeFile = useMemo(() => files.find((file) => file.id === activeFileId) || null, [files, activeFileId]);
  const previewCode = useMemo(() => files.find((file) => file.name === "App.jsx")?.content || "", [files]);

  const loadProject = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await projectService.byId(projectId);
      const fetchedProject = response.data.project;
      setProject(fetchedProject);
      const storageKey = getStorageKey(projectId);
      const localDraft = localStorage.getItem(storageKey);
      if (localDraft) {
        const parsed = JSON.parse(localDraft);
        setFiles(parsed.files);
        setActiveFileId(parsed.activeFileId || "app");
      } else {
        setFiles(normalizeFiles(fetchedProject.generatedCode, fetchedProject.name));
      }
    } catch (loadError) {
      setError(getApiErrorMessage(loadError, "Failed to load editor workspace."));
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    let isMounted = true;

    async function bootstrapEditor() {
      try {
        const response = await projectService.byId(projectId);
        if (!isMounted) return;
        const fetchedProject = response.data.project;
        setProject(fetchedProject);
        const storageKey = getStorageKey(projectId);
        const localDraft = localStorage.getItem(storageKey);
        if (localDraft) {
          const parsed = JSON.parse(localDraft);
          setFiles(parsed.files);
          setActiveFileId(parsed.activeFileId || "app");
        } else {
          setFiles(normalizeFiles(fetchedProject.generatedCode, fetchedProject.name));
        }
      } catch (loadError) {
        if (isMounted) {
          setError(getApiErrorMessage(loadError, "Failed to load editor workspace."));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    bootstrapEditor();
    return () => {
      isMounted = false;
    };
  }, [projectId]);

  useEffect(() => {
    if (!projectId || files.length === 0) return;
    if (autosaveRef.current) window.clearTimeout(autosaveRef.current);
    autosaveRef.current = window.setTimeout(() => {
      localStorage.setItem(getStorageKey(projectId), JSON.stringify({ files, activeFileId, savedAt: Date.now() }));
    }, 600);
    return () => {
      if (autosaveRef.current) window.clearTimeout(autosaveRef.current);
    };
  }, [files, activeFileId, projectId]);

  const updateActiveFileContent = (value) => {
    setFiles((prev) => prev.map((file) => (file.id === activeFileId ? { ...file, content: value ?? "" } : file)));
  };

  const applyCodeToAppFile = (code) => {
    setFiles((prev) =>
      prev.map((file) => (file.name === "App.jsx" ? { ...file, content: code ?? "" } : file))
    );
    setActiveFileId("app");
  };

  const resetChanges = () => {
    if (!project) return;
    setFiles(normalizeFiles(project.generatedCode, project.name));
    setActiveFileId("app");
    showToast({ type: "info", message: "Editor reset to generated version." });
  };

  const saveEditedVersion = async () => {
    if (!project) return;
    setIsSaving(true);
    try {
      await projectService.update(project._id, {
        generatedCode: previewCode,
        generatedHtml: previewCode,
        version: (project.version || 1) + 1,
      });
      setProject((prev) => ({ ...prev, generatedCode: previewCode, version: (prev.version || 1) + 1 }));
      showToast({ type: "success", message: "Edited version saved." });
    } catch (saveError) {
      showToast({ type: "error", message: getApiErrorMessage(saveError, "Failed to save edited version.") });
    } finally {
      setIsSaving(false);
    }
  };

  const copyActiveFile = async () => {
    if (!activeFile) return;
    await navigator.clipboard.writeText(activeFile.content);
    showToast({ type: "success", message: `${activeFile.name} copied.` });
  };

  return {
    project,
    files,
    activeFile,
    activeFileId,
    isLoading,
    error,
    isSaving,
    isFullscreenEditor,
    setIsFullscreenEditor,
    showMinimap,
    setShowMinimap,
    splitRatio,
    setSplitRatio,
    previewCode,
    setActiveFileId,
    updateActiveFileContent,
    applyCodeToAppFile,
    resetChanges,
    saveEditedVersion,
    copyActiveFile,
    reload: loadProject,
  };
}

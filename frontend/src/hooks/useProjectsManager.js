import { useCallback, useEffect, useMemo, useState } from "react";
import { PROJECT_SORT_OPTIONS } from "../constants/projectFilters";
import { useToast } from "./useToast";
import { projectService } from "../services/projectService";
import { getApiErrorMessage } from "../utils/apiError";

export function useProjectsManager() {
  const { showToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    theme: "",
    favorite: "",
    dateFrom: "",
    dateTo: "",
    sort: PROJECT_SORT_OPTIONS[0].value,
    page: 1,
  });

  const requestParams = useMemo(() => {
    const [sortBy, sortOrder] = filters.sort.split(":");
    return {
      search: filters.search || undefined,
      categories: filters.category || undefined,
      themes: filters.theme || undefined,
      favorite: filters.favorite || undefined,
      dateFrom: filters.dateFrom || undefined,
      dateTo: filters.dateTo || undefined,
      sortBy,
      sortOrder,
      page: filters.page,
      limit: pagination.limit,
    };
  }, [filters, pagination.limit]);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await projectService.list(requestParams);
      setProjects(response.data.projects);
      setPagination(response.data.pagination);
    } catch (loadError) {
      const message = getApiErrorMessage(loadError, "Failed to fetch projects.");
      setError(message);
      showToast({ type: "error", message });
    } finally {
      setIsLoading(false);
    }
  }, [requestParams, showToast]);

  useEffect(() => {
    let isMounted = true;

    async function bootstrapProjects() {
      try {
        const response = await projectService.list(requestParams);
        if (!isMounted) return;
        setProjects(response.data.projects);
        setPagination(response.data.pagination);
      } catch (loadError) {
        if (!isMounted) return;
        const message = getApiErrorMessage(loadError, "Failed to fetch projects.");
        setError(message);
        showToast({ type: "error", message });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    bootstrapProjects();
    return () => {
      isMounted = false;
    };
  }, [requestParams, showToast]);

  const setFilter = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
      page: field === "page" ? value : 1,
    }));
  };

  const deleteProject = async (projectId) => {
    const previous = projects;
    setProjects((prev) => prev.filter((project) => project._id !== projectId));
    try {
      await projectService.remove(projectId);
      showToast({ type: "success", message: "Project deleted successfully." });
      await loadProjects();
    } catch (deleteError) {
      setProjects(previous);
      showToast({ type: "error", message: getApiErrorMessage(deleteError, "Failed to delete project.") });
    }
  };

  const toggleFavorite = async (projectId) => {
    const previous = projects;
    setProjects((prev) =>
      prev.map((project) =>
        project._id === projectId ? { ...project, isFavorite: !project.isFavorite } : project
      )
    );
    try {
      await projectService.toggleFavorite(projectId);
    } catch (toggleError) {
      setProjects(previous);
      showToast({ type: "error", message: getApiErrorMessage(toggleError, "Failed to update favorite status.") });
    }
  };

  const duplicateProject = async (projectId) => {
    try {
      await projectService.duplicate(projectId);
      showToast({ type: "success", message: "Project duplicated successfully." });
      await loadProjects();
    } catch (duplicateError) {
      showToast({ type: "error", message: getApiErrorMessage(duplicateError, "Failed to duplicate project.") });
    }
  };

  const updateProject = async (projectId, payload) => {
    try {
      await projectService.update(projectId, payload);
      showToast({ type: "success", message: "Project updated successfully." });
      await loadProjects();
    } catch (updateError) {
      showToast({ type: "error", message: getApiErrorMessage(updateError, "Failed to update project.") });
    }
  };

  return {
    projects,
    filters,
    pagination,
    isLoading,
    error,
    setFilter,
    loadProjects,
    deleteProject,
    toggleFavorite,
    duplicateProject,
    updateProject,
  };
}

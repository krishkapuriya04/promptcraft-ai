import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import SEOHeadManager from "../components/seo/SEOHeadManager";
import { AIGenerationPanel, GenerationLoader, PromptHistory } from "../components/ai";
import Navbar from "../components/common/Navbar";
import { useAIGeneration } from "../hooks/useAIGeneration";
import { usePreviewState } from "../hooks/usePreviewState";
import { PreviewFrame, PreviewToolbar } from "../components/preview";
import { useProjectsManager } from "../hooks/useProjectsManager";
import {
  DeleteProjectModal,
  EmptyProjectsState,
  ProjectFilters,
  ProjectGrid,
  ProjectsSkeletonLoader,
  ProjectTable,
} from "../components/projects";
import { ROUTES } from "../constants/routes";
import { PROJECT_VIEW_MODES } from "../constants/projectFilters";
import { ExportModal } from "../components/export";
import { useProjectExport } from "../hooks/useProjectExport";
import { ScreenshotWorkspace } from "../components/screenshot";
import { DeployProjectModal } from "../components/deployment";
import { useDeploymentManager } from "../hooks/useDeploymentManager";

export default function Dashboard() {
  const [activeWorkspace, setActiveWorkspace] = useState("aiStudio");
  const [projectViewMode, setProjectViewMode] = useState(PROJECT_VIEW_MODES.GRID);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [exportTarget, setExportTarget] = useState(null);
  const [deployTarget, setDeployTarget] = useState(null);

  const {
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
  } = useAIGeneration();

  const recentGenerations = useMemo(() => history.slice(0, 3), [history]);
  const previewState = usePreviewState({
    code: selectedGeneration?.generatedCode || "",
    title: selectedGeneration?.title || "Generated Website",
  });
  const {
    projects,
    filters,
    pagination,
    isLoading: isProjectsLoading,
    error: projectsError,
    setFilter,
    deleteProject,
    toggleFavorite,
    duplicateProject,
    updateProject,
  } = useProjectsManager();

  const recentProjects = useMemo(() => projects.slice(0, 3), [projects]);
  const exportWorkspace = useProjectExport({
    projectId: exportTarget?._id,
    projectCode: exportTarget?.generatedCode || "",
  });
  const deploymentWorkspace = useDeploymentManager({
    projectId: deployTarget?._id,
    sourceVersion: deployTarget?.version,
  });

  if (isLoading) {
    return (
      <>
        <SEOHeadManager
          title="Workspace"
          description="Generate websites with AI and manage your PromptCraft projects."
          path={ROUTES.DASHBOARD}
        />
        <div className="min-h-screen bg-slate-950">
          <Navbar />
          <main className="mx-auto w-full max-w-7xl px-4 py-10">
            <GenerationLoader />
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHeadManager
        title="Workspace"
        description="Generate websites with AI and manage your PromptCraft projects."
        path={ROUTES.DASHBOARD}
      />
      <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Workspace</h2>
              <div className="mt-3 space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveWorkspace("aiStudio")}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                    activeWorkspace === "aiStudio" ? "bg-brand-500/20 text-brand-100" : "text-slate-300 hover:bg-white/10"
                  }`}
                >
                  AI Studio
                </button>
                <button
                  type="button"
                  onClick={() => setActiveWorkspace("projects")}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                    activeWorkspace === "projects" ? "bg-brand-500/20 text-brand-100" : "text-slate-300 hover:bg-white/10"
                  }`}
                >
                  Projects
                </button>
              </div>
            </div>
          </aside>

          <section className="space-y-6 lg:col-span-9">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white">
                {activeWorkspace === "aiStudio" ? "AI Generation Dashboard" : "Project Management Dashboard"}
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                {activeWorkspace === "aiStudio"
                  ? "Create premium websites with PromptCraft AI in seconds."
                  : "Manage, organize, and iterate your generated projects at scale."}
              </p>
            </div>

            {activeWorkspace === "aiStudio" ? (
              <>
                <div className="grid gap-5 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <AIGenerationPanel
                      form={form}
                      options={options}
                      onChange={updateForm}
                      onGenerate={generateWebsite}
                      isGenerating={isGenerating}
                    />
                    <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <h3 className="text-lg font-semibold text-white">Recent Generations</h3>
                      <div className="mt-4 grid gap-3 md:grid-cols-3">
                        {recentGenerations.map((item) => (
                          <button
                            type="button"
                            key={item._id}
                            onClick={() => setSelectedGenerationId(item._id)}
                            className="rounded-xl border border-white/10 bg-slate-950/40 p-3 text-left transition hover:border-white/20"
                          >
                            <p className="text-sm font-semibold text-white">{item.title}</p>
                            <p className="mt-1 text-xs text-slate-400">{item.category}</p>
                          </button>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="lg:col-span-4">
                    <PromptHistory history={history} selectedId={selectedGenerationId} onSelect={setSelectedGenerationId} />
                  </div>
                </div>

                {isGenerating ? <GenerationLoader /> : null}

                {selectedGeneration ? (
                  <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <h3 className="text-xl font-semibold text-white">{selectedGeneration.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">{selectedGeneration.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-200">{selectedGeneration.category}</span>
                      <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-200">{selectedGeneration.theme}</span>
                    </div>
                    <pre className="mt-4 overflow-auto rounded-xl border border-white/10 bg-slate-950/80 p-4 text-xs leading-6 text-slate-200">
                      {selectedGeneration.generatedCode}
                    </pre>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => previewState.setIsPreviewOpen(true)}
                        className="rounded-lg border border-white/15 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/10"
                      >
                        Open Preview
                      </button>
                    </div>
                  </motion.section>
                ) : (
                  <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
                    Generate your first website to see structured output here.
                  </section>
                )}

                {selectedGeneration && previewState.isPreviewOpen ? (
                  <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <PreviewToolbar
                      device={previewState.device}
                      onDeviceChange={previewState.setDevice}
                      onRefresh={previewState.refreshPreview}
                      onToggleFullscreen={() => previewState.setIsFullscreen((prev) => !prev)}
                      onToggleOpen={() => previewState.setIsPreviewOpen((prev) => !prev)}
                      isFullscreen={previewState.isFullscreen}
                      isOpen={previewState.isPreviewOpen}
                    />
                    <PreviewFrame
                      srcDoc={previewState.srcDoc}
                      device={previewState.device}
                      isRendering={previewState.isRendering}
                      error={previewState.renderError}
                      onRefresh={previewState.refreshPreview}
                      isFullscreen={previewState.isFullscreen}
                    />
                  </section>
                ) : null}

                <ScreenshotWorkspace />
              </>
            ) : (
              <>
                <ProjectFilters
                  filters={filters}
                  onFilterChange={setFilter}
                  viewMode={projectViewMode}
                  onViewModeChange={setProjectViewMode}
                  categories={options.categories}
                  themes={options.themes}
                />

                <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="text-lg font-semibold text-white">Recent Projects</h3>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {recentProjects.map((project) => (
                      <div key={project._id} className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
                        <p className="text-sm font-medium text-white">{project.name}</p>
                        <p className="mt-1 text-xs text-slate-400">{project.category} • {project.theme}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {isProjectsLoading ? <ProjectsSkeletonLoader /> : null}

                {!isProjectsLoading && projectsError ? (
                  <section className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-5 text-sm text-rose-100">{projectsError}</section>
                ) : null}

                {!isProjectsLoading && !projectsError && projects.length === 0 ? (
                  <EmptyProjectsState hasFilters={Boolean(filters.search || filters.category || filters.theme || filters.favorite || filters.dateFrom || filters.dateTo)} />
                ) : null}

                {!isProjectsLoading && projects.length > 0 ? (
                  <>
                    {projectViewMode === PROJECT_VIEW_MODES.GRID ? (
                      <ProjectGrid
                        projects={projects}
                        onFavorite={(project) => toggleFavorite(project._id)}
                        onOpen={() => {}}
                        onEdit={(project) => {
                          const updatedName = window.prompt("Edit project title", project.name);
                          if (updatedName && updatedName !== project.name) {
                            updateProject(project._id, { name: updatedName.trim() });
                          }
                        }}
                        onDuplicate={(project) => duplicateProject(project._id)}
                        onExport={(project) => {
                          setExportTarget(project);
                          exportWorkspace.openModal();
                        }}
                        onDeploy={(project) => {
                          setDeployTarget(project);
                          deploymentWorkspace.openModal();
                        }}
                        onDelete={(project) => setDeleteTarget(project)}
                      />
                    ) : (
                      <ProjectTable
                        projects={projects}
                        onFavorite={(project) => toggleFavorite(project._id)}
                        onOpen={() => {}}
                        onEdit={(project) => {
                          const updatedName = window.prompt("Edit project title", project.name);
                          if (updatedName && updatedName !== project.name) {
                            updateProject(project._id, { name: updatedName.trim() });
                          }
                        }}
                        onDuplicate={(project) => duplicateProject(project._id)}
                        onExport={(project) => {
                          setExportTarget(project);
                          exportWorkspace.openModal();
                        }}
                        onDeploy={(project) => {
                          setDeployTarget(project);
                          deploymentWorkspace.openModal();
                        }}
                        onDelete={(project) => setDeleteTarget(project)}
                      />
                    )}

                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                      <p className="text-slate-400">
                        Page {pagination.page} of {pagination.totalPages} • {pagination.total} projects
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={pagination.page <= 1}
                          onClick={() => setFilter("page", pagination.page - 1)}
                          className="rounded-lg border border-white/15 px-3 py-1 text-xs text-slate-200 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          disabled={pagination.page >= pagination.totalPages}
                          onClick={() => setFilter("page", pagination.page + 1)}
                          className="rounded-lg border border-white/15 px-3 py-1 text-xs text-slate-200 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            )}
          </section>
        </div>
      </main>

      <DeleteProjectModal
        isOpen={Boolean(deleteTarget)}
        projectName={deleteTarget?.name}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (!deleteTarget) return;
          await deleteProject(deleteTarget._id);
          setDeleteTarget(null);
        }}
      />
      <ExportModal
        isOpen={exportWorkspace.isOpen}
        onClose={() => {
          exportWorkspace.closeModal();
          setExportTarget(null);
        }}
        projectName={exportTarget?.name || "Project"}
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
        onClose={() => {
          deploymentWorkspace.setIsOpen(false);
          setDeployTarget(null);
        }}
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
    </div>
    </>
  );
}

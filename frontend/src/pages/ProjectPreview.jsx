import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import SEOHeadManager from "../components/seo/SEOHeadManager";
import { ROUTES } from "../constants/routes";
import { projectService } from "../services/projectService";

export default function ProjectPreview() {
  const { projectId } = useParams();
  const location = useLocation();
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function loadProject() {
      try {
        const response = await projectService.byId(projectId);
        setProject(response.data.project);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("Project preview failed:", error.message);
        }
      }
    }

    loadProject();
  }, [projectId]);

  return (
    <>
      <SEOHeadManager
        title={project ? `${project.name} — Preview` : "Project preview"}
        description="Live preview of your PromptCraft AI generated project."
        path={location.pathname}
      />
      <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h1 className="text-2xl font-bold text-slate-900">Project Preview</h1>
        {project ? (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-slate-500">Project: {project.name}</p>
            <p className="text-sm text-slate-700">{project.generatedHtml}</p>
            <Link to={ROUTES.PROJECT_EDITOR.replace(":projectId", project._id)}>
              <Button className="mt-3">Open in Editor</Button>
            </Link>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-500">Loading project data...</p>
        )}
      </div>
    </main>
    </>
  );
}

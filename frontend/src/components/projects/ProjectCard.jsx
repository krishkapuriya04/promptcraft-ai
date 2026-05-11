import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import ProjectActionsDropdown from "./ProjectActionsDropdown";

export default function ProjectCard({ project, onFavorite, onOpen, onEdit, onDuplicate, onExport, onDeploy, onDelete }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20">
      <div className="mb-3 h-28 rounded-xl border border-white/10 bg-gradient-to-br from-brand-500/20 to-cyan-400/10" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="line-clamp-1 text-base font-semibold text-white">{project.name}</h3>
          <p className="mt-1 text-xs text-slate-400">{project.category} • {project.theme}</p>
        </div>
        <button
          type="button"
          onClick={onFavorite}
          aria-label="Toggle favorite"
          className={`rounded-md px-2 py-1 text-sm ${project.isFavorite ? "text-amber-300" : "text-slate-500"}`}
        >
          ★
        </button>
      </div>
      <p className="mt-3 line-clamp-2 text-xs leading-6 text-slate-300">{project.description || project.prompt}</p>
      {project.deploymentStatus && project.deploymentStatus !== "idle" ? (
        <p className="mt-2 text-[11px] text-slate-400">Deployment: {project.deploymentStatus}</p>
      ) : null}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to={ROUTES.PROJECT_PREVIEW.replace(":projectId", project._id)}
            onClick={onOpen}
            className="text-xs font-medium text-brand-200 hover:text-brand-100"
          >
            Open
          </Link>
          <Link
            to={ROUTES.PROJECT_EDITOR.replace(":projectId", project._id)}
            className="text-xs font-medium text-cyan-200 hover:text-cyan-100"
          >
            Open in Editor
          </Link>
        </div>
        <ProjectActionsDropdown
          onOpen={onOpen}
          onEdit={onEdit}
          onDuplicate={onDuplicate}
          onExport={onExport}
          onDeploy={onDeploy}
          onDelete={onDelete}
        />
      </div>
      <p className="mt-3 text-[11px] text-slate-500">Updated {new Date(project.updatedAt).toLocaleDateString()}</p>
    </article>
  );
}

import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import ProjectActionsDropdown from "./ProjectActionsDropdown";

export default function ProjectTable({ projects, onFavorite, onOpen, onEdit, onDuplicate, onExport, onDeploy, onDelete }) {
  return (
    <div className="overflow-auto rounded-2xl border border-white/10 bg-white/[0.03]">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.12em] text-slate-400">
          <tr>
            <th className="px-4 py-3">Project</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Theme</th>
            <th className="px-4 py-3">Updated</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} className="border-t border-white/10">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => onFavorite(project)} className={project.isFavorite ? "text-amber-300" : "text-slate-500"}>
                    ★
                  </button>
                  <div>
                    <p className="font-medium text-white">{project.name}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Link
                        className="text-xs text-brand-200"
                        to={ROUTES.PROJECT_PREVIEW.replace(":projectId", project._id)}
                        onClick={() => onOpen(project)}
                      >
                        Open
                      </Link>
                      <Link
                        className="text-xs text-cyan-200"
                        to={ROUTES.PROJECT_EDITOR.replace(":projectId", project._id)}
                      >
                        Open in Editor
                      </Link>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-300">{project.category}</td>
              <td className="px-4 py-3 text-slate-300">{project.theme}</td>
              <td className="px-4 py-3 text-slate-400">{new Date(project.updatedAt).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <ProjectActionsDropdown
                  onOpen={() => onOpen(project)}
                  onEdit={() => onEdit(project)}
                  onDuplicate={() => onDuplicate(project)}
                  onExport={() => onExport(project)}
                  onDeploy={() => onDeploy(project)}
                  onDelete={() => onDelete(project)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

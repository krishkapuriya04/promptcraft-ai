import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects, onFavorite, onOpen, onEdit, onDuplicate, onExport, onDeploy, onDelete }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          onFavorite={() => onFavorite(project)}
          onOpen={() => onOpen(project)}
          onEdit={() => onEdit(project)}
          onDuplicate={() => onDuplicate(project)}
          onExport={() => onExport(project)}
          onDeploy={() => onDeploy(project)}
          onDelete={() => onDelete(project)}
        />
      ))}
    </div>
  );
}

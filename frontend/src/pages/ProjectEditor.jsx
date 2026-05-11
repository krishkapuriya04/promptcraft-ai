import { useLocation, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import SEOHeadManager from "../components/seo/SEOHeadManager";
import { CodeEditorWorkspace } from "../components/editor";

export default function ProjectEditor() {
  const { projectId } = useParams();
  const location = useLocation();

  return (
    <>
      <SEOHeadManager
        title="Project editor"
        description="Multi-file editor, versioning, optimization, and export tools for your PromptCraft project."
        path={location.pathname}
      />
      <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="mx-auto w-full max-w-[1500px] px-4 py-6">
        <CodeEditorWorkspace projectId={projectId} />
      </main>
    </div>
    </>
  );
}

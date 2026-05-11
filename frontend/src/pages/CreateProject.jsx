import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { ROUTES } from "../constants/routes";
import { projectService } from "../services/projectService";
import SEOHeadManager from "../components/seo/SEOHeadManager";

export default function CreateProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", prompt: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await projectService.create(form);
      navigate(ROUTES.PROJECT_PREVIEW.replace(":projectId", response.data.project._id));
    } catch (error) {
      console.error("Project creation failed:", error.message);
    }
  };

  return (
    <>
      <SEOHeadManager
        title="Create project"
        description="Start a new PromptCraft AI project from a name and prompt."
        path={ROUTES.CREATE_PROJECT}
      />
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-6 shadow-card">
        <h1 className="text-2xl font-bold text-slate-900">Create Project</h1>
        <Input
          id="name"
          name="name"
          label="Project Name"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
        <label htmlFor="prompt" className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Website Prompt</span>
          <textarea
            id="prompt"
            name="prompt"
            rows={6}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
            value={form.prompt}
            onChange={(e) => setForm((prev) => ({ ...prev, prompt: e.target.value }))}
            required
          />
        </label>
        <Button type="submit">Generate Project</Button>
      </form>
    </main>
    </>
  );
}

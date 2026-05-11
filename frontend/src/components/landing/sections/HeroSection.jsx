import { motion } from "framer-motion";
import { useState } from "react";
import Button from "../../common/Button";

export default function HeroSection() {
  const [prompt, setPrompt] = useState("Build a premium AI SaaS website for marketing teams.");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulated state to represent an async generation request.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsGenerating(false);
  };

  return (
    <section id="home" className="relative overflow-hidden px-4 pb-16 pt-16 md:pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="absolute bottom-5 left-20 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="pointer-events-none absolute -left-2 top-12 hidden rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-slate-200 backdrop-blur md:block"
        >
          +42% conversion uplift
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="pointer-events-none absolute -right-2 top-24 hidden rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-slate-200 backdrop-blur md:block"
        >
          Live generation in 9s
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl text-center">
          <p className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">
            AI Website Builder for Modern Teams
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Craft launch-ready websites from a single prompt.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-300 md:text-lg">
            PromptCraft AI generates polished pages, reusable layouts, and deploy-ready code using a premium design system powered by AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-brand-900/20 backdrop-blur-xl md:p-5"
        >
          <div className="flex flex-col gap-3 md:flex-row">
            <label htmlFor="prompt-input" className="sr-only">
              Website prompt
            </label>
            <input
              id="prompt-input"
              type="text"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              className="h-12 flex-1 rounded-xl border border-white/15 bg-slate-900/60 px-4 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-brand-300"
              placeholder="Describe the website you want to generate..."
            />
            <Button size="lg" className="h-12" isLoading={isGenerating} onClick={handleGenerate}>
              {isGenerating ? "Generating..." : "Generate Website"}
            </Button>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {["Realtime Preview", "Design-Coherent Sections", "Clean Exported Code"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

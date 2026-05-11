import { motion } from "framer-motion";
import { SectionTitle } from "..";

export default function PreviewShowcaseSection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="AI Preview Showcase"
          title="Visual and code previews in a single workspace"
          description="Collaborate faster with synchronized visual blocks and structured code output."
          centered={false}
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:col-span-3"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Generated website preview</p>
            <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/60 p-5">
              <div className="mb-4 h-8 w-1/2 rounded bg-white/10" />
              <div className="grid gap-3 md:grid-cols-3">
                <div className="h-24 rounded bg-brand-400/20" />
                <div className="h-24 rounded bg-fuchsia-400/20" />
                <div className="h-24 rounded bg-cyan-400/20" />
              </div>
              <div className="mt-3 h-24 rounded bg-white/5" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:col-span-2"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Code editor</p>
            <pre className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-slate-950/80 p-4 text-xs leading-6 text-slate-300">
{`<section class="hero">
  <h1>Ship faster with AI</h1>
  <p>Production-ready pages from prompts.</p>
  <button>Start free</button>
</section>`}
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

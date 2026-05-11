import { motion } from "framer-motion";
import { SectionTitle } from "..";
import { steps } from "../../../data/landingContent";

export default function HowItWorksSection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="How It Works"
          title="From idea to deployable website in three steps"
          description="A streamlined workflow designed for speed without compromising quality."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-300/40 bg-brand-500/20 text-sm font-semibold text-brand-100">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

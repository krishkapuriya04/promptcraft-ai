import { motion } from "framer-motion";
import { SectionTitle } from "..";
import { testimonials } from "../../../data/landingContent";

export default function TestimonialsSection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Testimonials"
          title="Loved by founders, marketers, and product teams"
          description="Teams use PromptCraft AI to launch faster while keeping a premium visual standard."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-sm leading-7 text-slate-200">"{testimonial.quote}"</p>
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                <p className="text-xs text-slate-400">{testimonial.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

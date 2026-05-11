import { motion } from "framer-motion";
import { trustedLogos } from "../../../data/landingContent";

export default function TrustedBySection() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-slate-400">Trusted by fast-moving product teams</p>
        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {trustedLogos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-center text-sm font-medium text-slate-300"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
